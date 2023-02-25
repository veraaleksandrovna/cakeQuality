from django.urls import reverse
from rest_framework import status
from ..base_auth_api_test_case import BaseAuthAPITestCaseView


class TestCake(BaseAuthAPITestCaseView):
    fixtures = ["quality/fixtures/users.json", "quality/fixtures/fixtures.json"]
    url_name = 'cake-list'

    def test_get_cakes(self):
        response = self.client.get(reverse(self.url_name), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.assertEqual(len(response.data), 5)

    def test_get_cakes_filtered_by_country(self):
        response = self.client.get(
            reverse(self.url_name), {"country__id": 1}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.assertEqual(len(response.data), 4)

    def test_get_cakes_filtered_by_manufacturer(self):
        response = self.client.get(
            reverse(self.url_name), {"manufacturer__id": 1}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.assertEqual(len(response.data), 4)

    def test_cake_add(self):
        data = {
            "name": "Марокко",
            "manufacturer": 1,
            "country": 1,
            "description": "Три сметанных коржа с черносливом, курагой и изюмом, крем из натуральных сливок и вареной сгущенки!",
            "composition": "мука в/с, яйцо, сметана, курага, чернослив, изюм, сахар, натуральные сливки, вареная сгущенка, E-201, E-304, E-226"
        }
        response = self.client.post(reverse(self.url_name), data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )
