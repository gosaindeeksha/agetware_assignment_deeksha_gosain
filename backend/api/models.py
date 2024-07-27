from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum
from decimal import Decimal
import math

class Loan(models.Model):
    loan_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='loans')
    loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    loan_period = models.IntegerField(help_text="Loan period in months")
    rate_of_interest = models.DecimalField(max_digits=5, decimal_places=2, default=9.9, editable=False)

    def save(self, *args, **kwargs):
        self.rate_of_interest = 9.9  # Ensure rate_of_interest is always 9.9
        super(Loan, self).save(*args, **kwargs)

    def __str__(self):
        return f"Loan {self.loan_id} for {self.user.username}"

class Payment(models.Model):
    PAYMENT_TYPE_CHOICES = [
        ('EMI', 'EMI'),
        ('Lumpsum', 'Lumpsum')
    ]

    payment_id = models.AutoField(primary_key=True)
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE,related_name="payments")
    payment_date = models.DateField(auto_now_add=True)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_type = models.CharField(max_length=7, choices=PAYMENT_TYPE_CHOICES)

    def __str__(self):
        return f"Payment {self.payment_id} for Loan {self.loan.loan_id}"
# Create your models here.
class DuesAndCalculations(models.Model):
    loan = models.OneToOneField(Loan, on_delete=models.CASCADE, related_name="dues_and_calculations")
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    amount_paid = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    amount_left = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    emi_left = models.IntegerField(default=0)
    initial_emi_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    def save(self, *args, **kwargs):
        P = self.loan.loan_amount
        N = Decimal(self.loan.loan_period) / 12
        R = Decimal(self.loan.rate_of_interest) / 100

        # Calculate Interest
        I = P * N * R

        # Calculate Total Amount
        self.total_amount = P + I

        # Calculate Initial EMI Amount
        self.initial_emi_amount = self.total_amount / Decimal(self.loan.loan_period)

        # Calculate Amount Paid
        self.amount_paid = self.loan.payments.aggregate(Sum('payment_amount'))['payment_amount__sum'] or Decimal('0.00')

        # Calculate Amount Left
        self.amount_left = self.total_amount - self.amount_paid

        # Ensure amount_left is not negative
        if self.amount_left < Decimal('0.00'):
            self.amount_left = Decimal('0.00')

        # Calculate EMI Left
        if self.amount_left> 0:
            self.emi_left =math.ceil (self.amount_left / self.initial_emi_amount)
        else:
            self.emi_left = 0

        super(DuesAndCalculations, self).save(*args, **kwargs)

    def __str__(self):
        return f"Dues and Calculations for Loan {self.loan.loan_id}"