from django.urls import path
from .views import (
    CreateUserView,
    LoanListCreateAPIView,
    LoanDetailAPIView,
    PaymentListCreateAPIView,
    PaymentDetailAPIView,
    DuesAndCalculationsListAPIView,
    
    DuesAndCalculationsByLoanAPIView,
    UserDetailAPIView  
)

urlpatterns = [
    
    path('loans/', LoanListCreateAPIView.as_view(), name='loan-list-create'),
    path('loans/<int:pk>/', LoanDetailAPIView.as_view(), name='loan-detail'),
    path('payments/', PaymentListCreateAPIView.as_view(), name='payment-list-create'),
    path('payments/<int:pk>/', PaymentDetailAPIView.as_view(), name='payment-detail'),
   path('dues_and_calculations/', DuesAndCalculationsListAPIView.as_view(), name='dues-and-calculations-list'),
    path('dues_and_calculations/loan/<int:loan__loan_id>/', DuesAndCalculationsByLoanAPIView.as_view(), name='dues-and-calculations-by-loan'),
    path('user/', UserDetailAPIView.as_view(), name='user-detail'),
]
