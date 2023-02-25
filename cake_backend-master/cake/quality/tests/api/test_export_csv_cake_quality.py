import csv
import io

from django.urls import reverse
from rest_framework import status
from ..base_auth_api_test_case import BaseAuthAPITestCaseView


class TestExportCSVCakeQuality(BaseAuthAPITestCaseView):
    fixtures = ["quality/fixtures/users.json", "quality/fixtures/fixtures.json"]
    url_name = "export-csv-cake-quality"

    def test_export_csv_cake_quality_get(self):
        response = self.client.get(reverse(self.url_name), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )
        content = response.content.decode('utf-8')
        csv_reader = csv.reader(io.StringIO(content))
        body = list(csv_reader)
        self.assertEqual(len(body[-1]), 13)
