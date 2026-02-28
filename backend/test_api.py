import requests

url = "http://localhost:5000/submit-project"

data = {
    "fullName": "Test User",
    "phoneNumber": "+919876543210",
    "gmailId": "test@example.com",
    "projectType": "Website Development",
    "projectDescription": "Need a simple website for my business",
    "servicesNeeded": ["Frontend Development"],
    "extras": ["SEO Optimization"]
}

try:
    response = requests.post(url, data=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
