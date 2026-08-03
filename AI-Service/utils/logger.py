from datetime import datetime


LINE = "=" * 70


def section(title: str):
    print("\n")
    print(LINE)
    print(title)
    print(LINE)


def info(message: str):
    print(f"ℹ️  {message}")


def success(message: str):
    print(f"✅ {message}")


def warning(message: str):
    print(f"⚠️  {message}")


def error(message: str):
    print(f"❌ {message}")


def divider():
    print("-" * 70)


def blank():
    print()


def timestamp():
    return datetime.now().strftime("%H:%M:%S")