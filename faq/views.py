from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils.translation import gettext as _
from django.http import HttpResponse
from django.contrib import messages
from .models import FAQ
from .forms import FAQForm
import json
from collections import defaultdict, Counter

# 📋 FAQ 목록 조회 + 필터링 + 정렬 + 카테고리 묶기 + 이미지 필드 포함
def faq_list(request):
    category = request.GET.get('category')
    area = request.GET.get('area')
    search = request.GET.get('search')
    sort = request.GET.get('sort', '-id')

    faqs = FAQ.objects.all()

    if category:
        faqs = faqs.filter(category=category)
    if area:
        faqs = faqs.filter(area=area)
    if search:
        faqs = faqs.filter(question__icontains=search) | faqs.filter(answer__icontains=search)

    faqs = faqs.order_by(sort)

    grouped_faqs = defaultdict(list)
    for faq in faqs:
        grouped_faqs[faq.category].append(faq)

    area_codes = ['LD', 'RBD', 'Lane', 'Tool']

    is_admin = request.user.is_authenticated
    return render(request, 'faq/faq_list.html', {
        'grouped_faqs': dict(grouped_faqs),
        'is_admin': is_admin,
        'request': request,
        'current_sort': sort,
        'area_codes': area_codes
    })

# 📊 관리자용 FAQ 통계 분석보기
@login_required
def faq_stats(request):
    faqs = FAQ.objects.all()
    category_counts = Counter(faqs.values_list('category', flat=True))
    area_counts = Counter(faqs.values_list('area', flat=True))
    return render(request, 'faq/faq_stats.html', {
        'category_counts': dict(category_counts),
        'area_counts': dict(area_counts),
    })

# ➕ FAQ 추가 (카테고리/구역 직접입력 우선 적용)
@login_required
def add_faq(request):
    if request.method == 'POST':
        form = FAQForm(request.POST, request.FILES)
        if form.is_valid():
            faq = form.save(commit=False)
            # ✅ 새 카테고리 입력 시 기존 카테고리 덮어쓰기
            if form.cleaned_data.get('new_category'):
                faq.category = form.cleaned_data['new_category']
            # ✅ 새 구역 입력 시 기존 구역 덮어쓰기
            if form.cleaned_data.get('new_area'):
                faq.area = form.cleaned_data['new_area']
            faq.save()
            return redirect('faq_list')
    else:
        form = FAQForm()
    return render(request, 'faq/add_faq.html', {'form': form})

# ✏️ FAQ 수정 + 이미지 삭제 + 직접입력 우선 적용
@login_required
def edit_faq(request, pk):
    faq = get_object_or_404(FAQ, pk=pk)

    if request.method == 'POST' and 'delete_image' in request.POST:
        if faq.image:
            faq.image.delete(save=False)
            faq.image = None
            faq.save()
            messages.success(request, '🗑️ 이미지가 삭제되었습니다.')
            return redirect('edit_faq', pk=pk)

    if request.method == 'POST':
        form = FAQForm(request.POST, request.FILES, instance=faq)
        if form.is_valid():
            faq = form.save(commit=False)
            # ✅ 수정 시 새 카테고리 입력 시 반영
            if form.cleaned_data.get('new_category'):
                faq.category = form.cleaned_data['new_category']
            # ✅ 수정 시 새 구역 입력 시 반영
            if form.cleaned_data.get('new_area'):
                faq.area = form.cleaned_data['new_area']
            faq.save()
            return redirect('faq_list')
    else:
        form = FAQForm(instance=faq)
    return render(request, 'faq/edit_faq.html', {'form': form})

# 🗑️ FAQ 삭제
@login_required
def delete_faq(request, pk):
    faq = get_object_or_404(FAQ, pk=pk)
    if request.method == 'POST':
        faq.delete()
        return redirect('faq_list')
    return render(request, 'faq/confirm_delete.html', {'faq': faq})

# 📄 FAQ 내보내기 (JSON 다운로드)
@login_required
def export_faqs(request):
    faqs = FAQ.objects.all().values('question', 'answer', 'category', 'area', 'image')
    response = HttpResponse(
        json.dumps(list(faqs), ensure_ascii=False, indent=2),
        content_type='application/json'
    )
    response['Content-Disposition'] = 'attachment; filename=faqs_export.json'
    return response

# 📅 FAQ 들어오기 + 메시지 표시
@login_required
def import_faqs(request):
    if request.method == 'POST' and request.FILES.get('faq_file'):
        faq_file = request.FILES['faq_file']
        try:
            data = json.load(faq_file)
            for item in data:
                FAQ.objects.create(
                    question=item.get('question', ''),
                    answer=item.get('answer', ''),
                    category=item.get('category', ''),
                    area=item.get('area', ''),
                    image=item.get('image', None)
                )
            messages.success(request, '📥 FAQ 불러오기에 성공했습니다.')
        except Exception as e:
            messages.error(request, f'❌ FAQ 불러오기에 실패했습니다. 오류: {str(e)}')
    else:
        messages.error(request, '❌ 파일이 첨부되지 않았습니다.')
    return redirect('faq_list')
