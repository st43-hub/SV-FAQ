from django import forms
from .models import FAQ

class FAQForm(forms.ModelForm):
    new_category = forms.CharField(required=False, label="새 카테고리")

    class Meta:
        model = FAQ
        fields = [
            'question',
            'answer',
            'image',
            'reference',  # 링크 필드 이름은 reference로 유지
            'category',
            'area',
        ]

        widgets = {
            'question': forms.TextInput(attrs={
                'class': 'w-full p-2 border rounded-lg',
                'placeholder': '질문을 입력하세요'
            }),
            'answer': forms.Textarea(attrs={
                'class': 'w-full p-2 border rounded-lg',
                'placeholder': '답변을 입력하세요',
                'rows': 4
            }),
            'reference': forms.URLInput(attrs={
                'class': 'w-full p-2 border rounded-lg',
                'placeholder': 'https://example.com'
            }),
            'category': forms.Select(attrs={
                'class': 'w-full p-2 border rounded-lg'
            }),
            'area': forms.Select(attrs={
                'class': 'w-full p-2 border rounded-lg'
            }),
        }