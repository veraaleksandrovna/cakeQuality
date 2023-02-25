from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class TestLogin(APITestCase):
    fixtures = ["quality/fixtures/users.json"]
    url_name = "login"

    def test_successful_login(self):
        sign_in_data = {"username": "user", "password": "password"}
        response = self.client.post(reverse(self.url_name), sign_in_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.assertNotEqual(response.data["token"], "")

    def test_no_password_login(self):
        sign_in_data = {
            "username": "user",
        }
        response = self.client.post(reverse(self.url_name), sign_in_data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, response.content
        )

    def test_wrong_password_login(self):
        sign_in_data = {
            "username": "user",
            "password": "wrong",
        }
        response = self.client.post(reverse(self.url_name), sign_in_data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, response.content
        )

    def test_no_username_login(self):
        sign_in_data = {
            "password": "password1",
        }
        response = self.client.post(reverse(self.url_name), sign_in_data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, response.content
        )
