from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Loan, Payment, DuesAndCalculations

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ["loan_id", "user", "loan_amount", "loan_period", "rate_of_interest"]
        extra_kwargs = {
            'user': {'read_only': True}  # Ensure the user field is read-only
        }

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["payment_id", "loan","payment_date", "payment_amount", "payment_type"]
       

class DuesAndCalculationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DuesAndCalculations
        fields = ["loan", "total_amount", "amount_paid", "amount_left", "emi_left", "initial_emi_amount"]