from django import forms
from .models import FAQ

class FAQForm(forms.ModelForm):
    class Meta:
        model = FAQ
        fields = ['question', 'answer', 'category', 'area']
        widgets = {
            'question': forms.TextInput(attrs={
                'class': 'form-control',
                'style': 'width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #d8b4fe;',
            }),
            'answer': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'style': 'width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #d8b4fe;',
            }),
        }
