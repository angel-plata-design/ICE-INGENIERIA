#!/usr/bin/env python3
"""
Backend API Testing for ICE Ingeniería
Tests all endpoints as specified in the review request
"""

import requests
import json
import uuid
from typing import Dict, Any, List
from datetime import datetime


# Read backend URL from frontend/.env
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                base_url = line.split('=')[1].strip()
                return f"{base_url}/api"
    raise Exception("REACT_APP_BACKEND_URL not found in /app/frontend/.env")


BASE_URL = get_backend_url()
print(f"Testing backend at: {BASE_URL}")


class TestResults:
    def __init__(self):
        self.passed = []
        self.failed = []
        self.created_quotation_ids = []
    
    def add_pass(self, test_name: str, details: str = ""):
        self.passed.append(f"✅ {test_name}: {details}")
        print(f"✅ PASS: {test_name}")
        if details:
            print(f"   {details}")
    
    def add_fail(self, test_name: str, details: str):
        self.failed.append(f"❌ {test_name}: {details}")
        print(f"❌ FAIL: {test_name}")
        print(f"   {details}")
    
    def print_summary(self):
        print("\n" + "="*80)
        print("TEST SUMMARY")
        print("="*80)
        print(f"Total Passed: {len(self.passed)}")
        print(f"Total Failed: {len(self.failed)}")
        print()
        
        if self.failed:
            print("FAILED TESTS:")
            for fail in self.failed:
                print(fail)
            print()
        
        if self.passed:
            print("PASSED TESTS:")
            for pass_test in self.passed:
                print(pass_test)


results = TestResults()


# ============================================================
# Test 1: Health Check - GET /api/
# ============================================================
def test_health_check():
    print("\n" + "="*80)
    print("TEST 1: Health Check - GET /api/")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        
        if response.status_code != 200:
            results.add_fail(
                "Health Check",
                f"Expected status 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        if data.get("service") == "ICE Ingeniería API" and data.get("status") == "ok":
            results.add_pass(
                "Health Check",
                f"Response: {json.dumps(data)}"
            )
        else:
            results.add_fail(
                "Health Check",
                f"Unexpected response format. Got: {json.dumps(data)}"
            )
    
    except Exception as e:
        results.add_fail("Health Check", f"Exception: {str(e)}")


# ============================================================
# Test 2: Create Quotation - POST /api/quotations
# ============================================================
def test_create_quotation_valid_full():
    print("\n" + "="*80)
    print("TEST 2a: Create Quotation - Valid Full Payload")
    print("="*80)
    
    payload = {
        "name": "Juan Pérez",
        "company": "Constructora ABC",
        "email": "juan@ejemplo.com",
        "phone": "(669) 123 4567",
        "service_type": "Vías Terrestres y Carreteras",
        "message": "Necesitamos cotización para 5km de vialidad."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quotations", json=payload, timeout=10)
        
        if response.status_code != 201:
            results.add_fail(
                "Create Quotation (Valid Full)",
                f"Expected status 201, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        # Verify all required fields
        errors = []
        
        if "id" not in data:
            errors.append("Missing 'id' field")
        else:
            results.created_quotation_ids.append(data["id"])
            # Verify it's a valid UUID
            try:
                uuid.UUID(data["id"])
            except ValueError:
                errors.append(f"'id' is not a valid UUID: {data['id']}")
        
        if "created_at" not in data:
            errors.append("Missing 'created_at' field")
        else:
            # Verify it's a valid datetime
            try:
                datetime.fromisoformat(data["created_at"].replace('Z', '+00:00'))
            except ValueError:
                errors.append(f"'created_at' is not a valid datetime: {data['created_at']}")
        
        if data.get("status") != "new":
            errors.append(f"Expected status='new', got '{data.get('status')}'")
        
        # Verify submitted fields are preserved (trimmed)
        if data.get("name") != "Juan Pérez":
            errors.append(f"Name mismatch: expected 'Juan Pérez', got '{data.get('name')}'")
        
        if data.get("company") != "Constructora ABC":
            errors.append(f"Company mismatch: expected 'Constructora ABC', got '{data.get('company')}'")
        
        if data.get("email") != "juan@ejemplo.com":
            errors.append(f"Email mismatch: expected 'juan@ejemplo.com', got '{data.get('email')}'")
        
        if data.get("phone") != "(669) 123 4567":
            errors.append(f"Phone mismatch: expected '(669) 123 4567', got '{data.get('phone')}'")
        
        if data.get("service_type") != "Vías Terrestres y Carreteras":
            errors.append(f"Service type mismatch: expected 'Vías Terrestres y Carreteras', got '{data.get('service_type')}'")
        
        if data.get("message") != "Necesitamos cotización para 5km de vialidad.":
            errors.append(f"Message mismatch: expected 'Necesitamos cotización para 5km de vialidad.', got '{data.get('message')}'")
        
        if errors:
            results.add_fail("Create Quotation (Valid Full)", "; ".join(errors))
        else:
            results.add_pass("Create Quotation (Valid Full)", f"Created quotation with id={data['id']}")
    
    except Exception as e:
        results.add_fail("Create Quotation (Valid Full)", f"Exception: {str(e)}")


def test_create_quotation_minimal():
    print("\n" + "="*80)
    print("TEST 2b: Create Quotation - Minimal Valid Payload")
    print("="*80)
    
    payload = {
        "name": "Ana",
        "email": "ana@test.com",
        "message": "Proyecto edificación residencial mixta."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quotations", json=payload, timeout=10)
        
        if response.status_code != 201:
            results.add_fail(
                "Create Quotation (Minimal)",
                f"Expected status 201, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        errors = []
        
        if "id" not in data:
            errors.append("Missing 'id' field")
        else:
            results.created_quotation_ids.append(data["id"])
        
        if data.get("name") != "Ana":
            errors.append(f"Name mismatch: expected 'Ana', got '{data.get('name')}'")
        
        if data.get("email") != "ana@test.com":
            errors.append(f"Email mismatch: expected 'ana@test.com', got '{data.get('email')}'")
        
        if data.get("message") != "Proyecto edificación residencial mixta.":
            errors.append(f"Message mismatch")
        
        # Optional fields should be None/null
        if data.get("company") is not None:
            errors.append(f"Expected company=None, got '{data.get('company')}'")
        
        if data.get("phone") is not None:
            errors.append(f"Expected phone=None, got '{data.get('phone')}'")
        
        if data.get("service_type") is not None:
            errors.append(f"Expected service_type=None, got '{data.get('service_type')}'")
        
        if errors:
            results.add_fail("Create Quotation (Minimal)", "; ".join(errors))
        else:
            results.add_pass("Create Quotation (Minimal)", f"Created quotation with id={data['id']}, optional fields are None")
    
    except Exception as e:
        results.add_fail("Create Quotation (Minimal)", f"Exception: {str(e)}")


def test_create_quotation_invalid_email():
    print("\n" + "="*80)
    print("TEST 2c: Create Quotation - Invalid Email")
    print("="*80)
    
    payload = {
        "name": "Ana",
        "email": "not-an-email",
        "message": "Hola hola hola"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quotations", json=payload, timeout=10)
        
        if response.status_code == 422:
            results.add_pass("Create Quotation (Invalid Email)", "Correctly rejected with 422")
        else:
            results.add_fail(
                "Create Quotation (Invalid Email)",
                f"Expected status 422, got {response.status_code}. Response: {response.text}"
            )
    
    except Exception as e:
        results.add_fail("Create Quotation (Invalid Email)", f"Exception: {str(e)}")


def test_create_quotation_missing_message():
    print("\n" + "="*80)
    print("TEST 2d: Create Quotation - Missing Required Field (message)")
    print("="*80)
    
    payload = {
        "name": "Ana",
        "email": "ana@test.com"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quotations", json=payload, timeout=10)
        
        if response.status_code == 422:
            results.add_pass("Create Quotation (Missing Message)", "Correctly rejected with 422")
        else:
            results.add_fail(
                "Create Quotation (Missing Message)",
                f"Expected status 422, got {response.status_code}. Response: {response.text}"
            )
    
    except Exception as e:
        results.add_fail("Create Quotation (Missing Message)", f"Exception: {str(e)}")


def test_create_quotation_message_too_short():
    print("\n" + "="*80)
    print("TEST 2e: Create Quotation - Message Too Short")
    print("="*80)
    
    payload = {
        "name": "Ana",
        "email": "ana@test.com",
        "message": "hi"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quotations", json=payload, timeout=10)
        
        if response.status_code == 422:
            results.add_pass("Create Quotation (Message Too Short)", "Correctly rejected with 422")
        else:
            results.add_fail(
                "Create Quotation (Message Too Short)",
                f"Expected status 422, got {response.status_code}. Response: {response.text}"
            )
    
    except Exception as e:
        results.add_fail("Create Quotation (Message Too Short)", f"Exception: {str(e)}")


def test_create_quotation_name_too_short():
    print("\n" + "="*80)
    print("TEST 2f: Create Quotation - Name Too Short")
    print("="*80)
    
    payload = {
        "name": "A",
        "email": "ana@test.com",
        "message": "Hola, esto es una prueba"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quotations", json=payload, timeout=10)
        
        if response.status_code == 422:
            results.add_pass("Create Quotation (Name Too Short)", "Correctly rejected with 422")
        else:
            results.add_fail(
                "Create Quotation (Name Too Short)",
                f"Expected status 422, got {response.status_code}. Response: {response.text}"
            )
    
    except Exception as e:
        results.add_fail("Create Quotation (Name Too Short)", f"Exception: {str(e)}")


def test_create_quotation_whitespace_trimming():
    print("\n" + "="*80)
    print("TEST 2g: Create Quotation - Whitespace Trimming")
    print("="*80)
    
    payload = {
        "name": "  Pedro  ",
        "email": "pedro@test.com",
        "message": "  Test message with spaces  "
    }
    
    try:
        response = requests.post(f"{BASE_URL}/quotations", json=payload, timeout=10)
        
        if response.status_code != 201:
            results.add_fail(
                "Create Quotation (Whitespace Trimming)",
                f"Expected status 201, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        if data.get("name") == "Pedro" and data.get("message") == "Test message with spaces":
            results.add_pass("Create Quotation (Whitespace Trimming)", "Name and message correctly trimmed")
            results.created_quotation_ids.append(data["id"])
        else:
            results.add_fail(
                "Create Quotation (Whitespace Trimming)",
                f"Trimming failed. Name: '{data.get('name')}', Message: '{data.get('message')}'"
            )
    
    except Exception as e:
        results.add_fail("Create Quotation (Whitespace Trimming)", f"Exception: {str(e)}")


# ============================================================
# Test 3: List Quotations - GET /api/quotations
# ============================================================
def test_list_quotations():
    print("\n" + "="*80)
    print("TEST 3a: List Quotations - GET /api/quotations")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/quotations", timeout=10)
        
        if response.status_code != 200:
            results.add_fail(
                "List Quotations",
                f"Expected status 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        if not isinstance(data, list):
            results.add_fail("List Quotations", f"Expected array, got {type(data)}")
            return
        
        # Verify created quotations are present
        found_ids = [q["id"] for q in data]
        missing_ids = [qid for qid in results.created_quotation_ids if qid not in found_ids]
        
        if missing_ids:
            results.add_fail(
                "List Quotations",
                f"Missing quotations: {missing_ids}"
            )
        else:
            # Verify sorting by created_at DESC
            if len(data) > 1:
                dates = [q.get("created_at") for q in data]
                sorted_dates = sorted(dates, reverse=True)
                if dates == sorted_dates:
                    results.add_pass(
                        "List Quotations",
                        f"Returned {len(data)} quotations, sorted by created_at DESC"
                    )
                else:
                    results.add_fail(
                        "List Quotations",
                        "Quotations not sorted by created_at DESC"
                    )
            else:
                results.add_pass(
                    "List Quotations",
                    f"Returned {len(data)} quotations"
                )
    
    except Exception as e:
        results.add_fail("List Quotations", f"Exception: {str(e)}")


def test_list_quotations_limit():
    print("\n" + "="*80)
    print("TEST 3b: List Quotations - Limit Query Param")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/quotations?limit=2", timeout=10)
        
        if response.status_code != 200:
            results.add_fail(
                "List Quotations (limit=2)",
                f"Expected status 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        if len(data) <= 2:
            results.add_pass("List Quotations (limit=2)", f"Returned {len(data)} quotations (≤2)")
        else:
            results.add_fail("List Quotations (limit=2)", f"Expected ≤2 quotations, got {len(data)}")
    
    except Exception as e:
        results.add_fail("List Quotations (limit=2)", f"Exception: {str(e)}")


def test_list_quotations_limit_zero():
    print("\n" + "="*80)
    print("TEST 3c: List Quotations - Limit=0 (should reject)")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/quotations?limit=0", timeout=10)
        
        if response.status_code == 422:
            results.add_pass("List Quotations (limit=0)", "Correctly rejected with 422")
        else:
            results.add_fail(
                "List Quotations (limit=0)",
                f"Expected status 422, got {response.status_code}. Response: {response.text}"
            )
    
    except Exception as e:
        results.add_fail("List Quotations (limit=0)", f"Exception: {str(e)}")


def test_list_quotations_limit_999():
    print("\n" + "="*80)
    print("TEST 3d: List Quotations - Limit=999 (should reject)")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/quotations?limit=999", timeout=10)
        
        if response.status_code == 422:
            results.add_pass("List Quotations (limit=999)", "Correctly rejected with 422")
        else:
            results.add_fail(
                "List Quotations (limit=999)",
                f"Expected status 422, got {response.status_code}. Response: {response.text}"
            )
    
    except Exception as e:
        results.add_fail("List Quotations (limit=999)", f"Exception: {str(e)}")


# ============================================================
# Test 4: Get Quotation by ID - GET /api/quotations/{id}
# ============================================================
def test_get_quotation_by_id():
    print("\n" + "="*80)
    print("TEST 4a: Get Quotation by ID - Valid ID")
    print("="*80)
    
    if not results.created_quotation_ids:
        results.add_fail("Get Quotation by ID", "No quotation IDs available from previous tests")
        return
    
    quotation_id = results.created_quotation_ids[0]
    
    try:
        response = requests.get(f"{BASE_URL}/quotations/{quotation_id}", timeout=10)
        
        if response.status_code != 200:
            results.add_fail(
                "Get Quotation by ID",
                f"Expected status 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        if data.get("id") == quotation_id:
            results.add_pass("Get Quotation by ID", f"Retrieved quotation {quotation_id}")
        else:
            results.add_fail(
                "Get Quotation by ID",
                f"ID mismatch: expected {quotation_id}, got {data.get('id')}"
            )
    
    except Exception as e:
        results.add_fail("Get Quotation by ID", f"Exception: {str(e)}")


def test_get_quotation_not_found():
    print("\n" + "="*80)
    print("TEST 4b: Get Quotation by ID - Non-existent ID")
    print("="*80)
    
    random_uuid = str(uuid.uuid4())
    
    try:
        response = requests.get(f"{BASE_URL}/quotations/{random_uuid}", timeout=10)
        
        if response.status_code != 404:
            results.add_fail(
                "Get Quotation (Not Found)",
                f"Expected status 404, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        if data.get("detail") == "Quotation not found":
            results.add_pass("Get Quotation (Not Found)", "Correctly returned 404 with proper error message")
        else:
            results.add_fail(
                "Get Quotation (Not Found)",
                f"Expected detail='Quotation not found', got {data}"
            )
    
    except Exception as e:
        results.add_fail("Get Quotation (Not Found)", f"Exception: {str(e)}")


# ============================================================
# Test 5: Legacy Status Endpoints
# ============================================================
def test_legacy_status_post():
    print("\n" + "="*80)
    print("TEST 5a: Legacy Status - POST /api/status")
    print("="*80)
    
    payload = {"client_name": "test_client"}
    
    try:
        response = requests.post(f"{BASE_URL}/status", json=payload, timeout=10)
        
        if response.status_code not in [200, 201]:
            results.add_fail(
                "Legacy Status POST",
                f"Expected status 200/201, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        if "id" in data and "timestamp" in data:
            results.add_pass("Legacy Status POST", f"Created status check with id={data['id']}")
        else:
            results.add_fail(
                "Legacy Status POST",
                f"Missing id or timestamp in response: {data}"
            )
    
    except Exception as e:
        results.add_fail("Legacy Status POST", f"Exception: {str(e)}")


def test_legacy_status_get():
    print("\n" + "="*80)
    print("TEST 5b: Legacy Status - GET /api/status")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/status", timeout=10)
        
        if response.status_code != 200:
            results.add_fail(
                "Legacy Status GET",
                f"Expected status 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        if isinstance(data, list):
            results.add_pass("Legacy Status GET", f"Returned array with {len(data)} entries")
        else:
            results.add_fail("Legacy Status GET", f"Expected array, got {type(data)}")
    
    except Exception as e:
        results.add_fail("Legacy Status GET", f"Exception: {str(e)}")


# ============================================================
# Test 6: CORS Headers
# ============================================================
def test_cors_headers():
    print("\n" + "="*80)
    print("TEST 6: CORS Headers")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        
        cors_header = response.headers.get("access-control-allow-origin")
        
        if cors_header == "*":
            results.add_pass("CORS Headers", "access-control-allow-origin: * present")
        else:
            results.add_fail(
                "CORS Headers",
                f"Expected access-control-allow-origin: *, got '{cors_header}'"
            )
    
    except Exception as e:
        results.add_fail("CORS Headers", f"Exception: {str(e)}")


# ============================================================
# Test 7: Database Verification
# ============================================================
def test_database_verification():
    print("\n" + "="*80)
    print("TEST 7: Database Verification")
    print("="*80)
    
    try:
        # Get all quotations
        response = requests.get(f"{BASE_URL}/quotations?limit=500", timeout=10)
        
        if response.status_code != 200:
            results.add_fail(
                "Database Verification",
                f"Failed to retrieve quotations. Status: {response.status_code}"
            )
            return
        
        data = response.json()
        
        # Verify all created quotations are persisted
        found_ids = [q["id"] for q in data]
        missing_ids = [qid for qid in results.created_quotation_ids if qid not in found_ids]
        
        if missing_ids:
            results.add_fail(
                "Database Verification",
                f"Quotations not persisted in MongoDB: {missing_ids}"
            )
        else:
            results.add_pass(
                "Database Verification",
                f"All {len(results.created_quotation_ids)} created quotations persisted in MongoDB"
            )
    
    except Exception as e:
        results.add_fail("Database Verification", f"Exception: {str(e)}")


# ============================================================
# Run All Tests
# ============================================================
def run_all_tests():
    print("\n" + "="*80)
    print("STARTING BACKEND API TESTS FOR ICE INGENIERÍA")
    print("="*80)
    print(f"Backend URL: {BASE_URL}")
    print()
    
    # Test 1: Health Check
    test_health_check()
    
    # Test 2: Create Quotation (multiple scenarios)
    test_create_quotation_valid_full()
    test_create_quotation_minimal()
    test_create_quotation_invalid_email()
    test_create_quotation_missing_message()
    test_create_quotation_message_too_short()
    test_create_quotation_name_too_short()
    test_create_quotation_whitespace_trimming()
    
    # Test 3: List Quotations
    test_list_quotations()
    test_list_quotations_limit()
    test_list_quotations_limit_zero()
    test_list_quotations_limit_999()
    
    # Test 4: Get Quotation by ID
    test_get_quotation_by_id()
    test_get_quotation_not_found()
    
    # Test 5: Legacy Status Endpoints
    test_legacy_status_post()
    test_legacy_status_get()
    
    # Test 6: CORS Headers
    test_cors_headers()
    
    # Test 7: Database Verification
    test_database_verification()
    
    # Print Summary
    results.print_summary()
    
    return len(results.failed) == 0


if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)
