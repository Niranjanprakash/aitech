"""
Test WhatsApp notification independently
Run: python test_whatsapp.py
"""
import os
from dotenv import load_dotenv
from twilio.rest import Client

load_dotenv()

def test_whatsapp():
    account_sid = os.getenv("TWILIO_ACCOUNT_SID", "").strip()
    auth_token = os.getenv("TWILIO_AUTH_TOKEN", "").strip()
    from_whatsapp = os.getenv("TWILIO_WHATSAPP_FROM", "").strip()
    to_whatsapp = os.getenv("TWILIO_WHATSAPP_TO", "").strip()
    
    print("=== Testing WhatsApp Configuration ===")
    print(f"Account SID: {account_sid[:10]}...")
    print(f"From: {from_whatsapp}")
    print(f"To: {to_whatsapp}")
    
    if not all([account_sid, auth_token, from_whatsapp, to_whatsapp]):
        print("\n❌ ERROR: Missing configuration!")
        return
    
    try:
        client = Client(account_sid, auth_token)
        
        message = client.messages.create(
            body="🧪 TEST MESSAGE from AITechPulze\n\nIf you receive this, WhatsApp notifications are working! ✅",
            from_=from_whatsapp,
            to=to_whatsapp
        )
        
        print(f"\n✅ Message sent! SID: {message.sid}")
        print(f"Status: {message.status}")
        
        # Wait and check status
        import time
        time.sleep(3)
        
        updated_message = client.messages(message.sid).fetch()
        print(f"Updated Status: {updated_message.status}")
        
        if updated_message.status == 'failed':
            print(f"\n❌ FAILED! Error: {updated_message.error_message}")
            print(f"Error Code: {updated_message.error_code}")
        elif updated_message.status == 'undelivered':
            print("\n⚠️ UNDELIVERED - Sandbox not activated!")
            print("\nActivate sandbox:")
            print("1. Open WhatsApp")
            print("2. Message +1 415 523 8886")
            print("3. Send: join <your-code>")
        elif updated_message.status in ['sent', 'delivered']:
            print("\n✅ Check your WhatsApp now!")
        else:
            print(f"\nStatus: {updated_message.status} (waiting...)")
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        print("\nPossible issues:")
        print("1. Twilio sandbox not activated (send 'join <code>' to +14155238886)")
        print("2. Invalid credentials")
        print("3. No Twilio credits")

if __name__ == "__main__":
    test_whatsapp()
