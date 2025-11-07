import json

import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_csrf_token_view_sets_cookie(csrf_client):
    url = reverse("auth-csrf")

    response = csrf_client.get(url)
    payload = response.json()

    assert response.status_code == 200
    assert payload["detail"] == "Token successfully set in cookie!"
    assert "csrftoken" in response.cookies
    assert response.cookies["csrftoken"].value


@pytest.mark.django_db
def test_login_validates_payload(csrf_client):
    csrf_client.get(reverse("auth-csrf"))
    token = csrf_client.cookies["csrftoken"].value

    response = csrf_client.post(
        reverse("auth-login"),
        data=json.dumps({}),
        content_type="application/json",
        HTTP_X_CSRFTOKEN=token,
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Username & password are required"


@pytest.mark.django_db
def test_login_rejects_invalid_credentials(csrf_client):
    csrf_client.get(reverse("auth-csrf"))
    token = csrf_client.cookies["csrftoken"].value

    response = csrf_client.post(
        reverse("auth-login"),
        data=json.dumps({"username": "ghost", "password": "nope"}),
        content_type="application/json",
        HTTP_X_CSRFTOKEN=token,
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid username/password combination"


@pytest.mark.django_db
def test_login_requires_csrf_token(csrf_client, user, user_password):
    payload = json.dumps({"username": user.username, "password": user_password})

    response = csrf_client.post(
        reverse("auth-login"),
        data=payload,
        content_type="application/json",
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_login_success_and_me_endpoint(csrf_client, user, user_password):
    csrf_client.get(reverse("auth-csrf"))
    token = csrf_client.cookies["csrftoken"].value

    login_response = csrf_client.post(
        reverse("auth-login"),
        data=json.dumps({"username": user.username, "password": user_password}),
        content_type="application/json",
        HTTP_X_CSRFTOKEN=token,
    )

    assert login_response.status_code == 200
    assert login_response.json()["username"] == user.username
    assert "sessionid" in login_response.cookies

    me_response = csrf_client.get(reverse("auth-me"))
    assert me_response.status_code == 200
    assert me_response.json()["email"] == user.email


@pytest.mark.django_db
def test_me_requires_authentication(api_client):
    response = api_client.get(reverse("auth-me"))

    assert response.status_code == 401


@pytest.mark.django_db
def test_logout_clears_session(csrf_client, user, user_password):
    csrf_client.get(reverse("auth-csrf"))
    token = csrf_client.cookies["csrftoken"].value

    csrf_client.post(
        reverse("auth-login"),
        data=json.dumps({"username": user.username, "password": user_password}),
        content_type="application/json",
        HTTP_X_CSRFTOKEN=token,
    )
    refreshed_token = csrf_client.cookies["csrftoken"].value

    logout_response = csrf_client.post(
        reverse("auth-logout"),
        content_type="application/json",
        HTTP_X_CSRFTOKEN=refreshed_token,
    )

    assert logout_response.status_code == 200
    assert logout_response.json()["detail"] == "Logged out successfully!"

    me_response = csrf_client.get(reverse("auth-me"))
    assert me_response.status_code == 401
