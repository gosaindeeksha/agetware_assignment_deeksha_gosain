from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, LoanSerializer, PaymentSerializer, DuesAndCalculationsSerializer
from .models import Loan, Payment, DuesAndCalculations
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Sum
import math
from decimal import Decimal


# User creation view
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


# Loan views
class LoanListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Loan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        loan = serializer.save(user=self.request.user)
        self.update_dues_and_calculations(loan)

    def update_dues_and_calculations(self, loan):
        # Convert all inputs to Decimal
        loan_amount = Decimal(loan.loan_amount)
        loan_period = Decimal(loan.loan_period)
        rate_of_interest = Decimal(loan.rate_of_interest) / Decimal(100)

        dues_and_calculations, created = DuesAndCalculations.objects.get_or_create(loan=loan)
        total_amount = loan_amount + (loan_amount * (loan_period / Decimal(12)) * rate_of_interest)
        dues_and_calculations.total_amount = total_amount
        
        # Calculate amount paid and amount left
        amount_paid = loan.payments.aggregate(Sum('payment_amount'))['payment_amount__sum'] or Decimal('0.00')
        dues_and_calculations.amount_paid = amount_paid
        dues_and_calculations.amount_left = total_amount - amount_paid

        # Calculate initial EMI amount and EMIs left
        initial_emi_amount = total_amount / loan_period
        dues_and_calculations.initial_emi_amount = initial_emi_amount
        dues_and_calculations.emis_left = math.ceil(dues_and_calculations.amount_left / dues_and_calculations.initial_emi_amount)
        dues_and_calculations.save()

class LoanDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Loan.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        loan = serializer.save()
        self.update_dues_and_calculations(loan)

    def update_dues_and_calculations(self, loan):
        # Convert all inputs to Decimal
        loan_amount = Decimal(loan.loan_amount)
        loan_period = Decimal(loan.loan_period)
        rate_of_interest = Decimal(loan.rate_of_interest) / Decimal(100)

        dues_and_calculations, created = DuesAndCalculations.objects.get_or_create(loan=loan)
        total_amount = loan_amount + (loan_amount * (loan_period / Decimal(12)) * rate_of_interest)
        dues_and_calculations.total_amount = total_amount
        
        # Calculate amount paid and amount left
        amount_paid = loan.payments.aggregate(Sum('payment_amount'))['payment_amount__sum'] or Decimal('0.00')
        dues_and_calculations.amount_paid = amount_paid
        dues_and_calculations.amount_left = total_amount - amount_paid

        # Calculate initial EMI amount and EMIs left
        initial_emi_amount = total_amount / loan_period
        dues_and_calculations.initial_emi_amount = initial_emi_amount
        dues_and_calculations.emis_left = math.ceil(dues_and_calculations.amount_left / dues_and_calculations.initial_emi_amount)
        dues_and_calculations.save()

# Payment views
class PaymentListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(loan__user=self.request.user)

    def perform_create(self, serializer):
        payment = serializer.save()
        self.update_dues_and_calculations(payment.loan)

    def update_dues_and_calculations(self, loan):
        # Convert all inputs to Decimal
        loan_amount = Decimal(loan.loan_amount)
        loan_period = Decimal(loan.loan_period)
        rate_of_interest = Decimal(loan.rate_of_interest) / Decimal(100)

        dues_and_calculations, created = DuesAndCalculations.objects.get_or_create(loan=loan)
        total_amount = loan_amount + (loan_amount * (loan_period / Decimal(12)) * rate_of_interest)
        dues_and_calculations.total_amount = total_amount
        
        # Calculate amount paid and amount left
        amount_paid = loan.payments.aggregate(Sum('payment_amount'))['payment_amount__sum'] or Decimal('0.00')
        dues_and_calculations.amount_paid = amount_paid
        dues_and_calculations.amount_left = total_amount - amount_paid

        # Calculate initial EMI amount and EMIs left
        initial_emi_amount = total_amount / loan_period
        dues_and_calculations.initial_emi_amount = initial_emi_amount
        dues_and_calculations.emis_left = math.ceil(dues_and_calculations.amount_left / dues_and_calculations.initial_emi_amount)
        dues_and_calculations.save()

class PaymentDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(loan__user=self.request.user)

    def perform_update(self, serializer):
        payment = serializer.save()
        self.update_dues_and_calculations(payment.loan)

    def update_dues_and_calculations(self, loan):
        # Convert all inputs to Decimal
        loan_amount = Decimal(loan.loan_amount)
        loan_period = Decimal(loan.loan_period)
        rate_of_interest = Decimal(loan.rate_of_interest) / Decimal(100)

        dues_and_calculations, created = DuesAndCalculations.objects.get_or_create(loan=loan)
        total_amount = loan_amount + (loan_amount * (loan_period / Decimal(12)) * rate_of_interest)
        dues_and_calculations.total_amount = total_amount
        
        # Calculate amount paid and amount left
        amount_paid = loan.payments.aggregate(Sum('payment_amount'))['payment_amount__sum'] or Decimal('0.00')
        dues_and_calculations.amount_paid = amount_paid
        dues_and_calculations.amount_left = total_amount - amount_paid

        # Calculate initial EMI amount and EMIs left
        initial_emi_amount = total_amount / loan_period
        dues_and_calculations.initial_emi_amount = initial_emi_amount
        dues_and_calculations.emis_left = math.ceil(dues_and_calculations.amount_left / dues_and_calculations.initial_emi_amount)
        dues_and_calculations.save()

# DuesAndCalculations views
class DuesAndCalculationsListAPIView(generics.ListAPIView):
    serializer_class = DuesAndCalculationsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DuesAndCalculations.objects.filter(loan__user=self.request.user)

class DuesAndCalculationsByLoanAPIView(generics.RetrieveAPIView):
    serializer_class = DuesAndCalculationsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'loan__loan_id'

    def get_queryset(self):
        return DuesAndCalculations.objects.filter(loan__user=self.request.user)