@echo off
cd /d "%~dp0"
py -3 ADD_BUTTON_TO_HOMEPAGE.py
if errorlevel 1 python ADD_BUTTON_TO_HOMEPAGE.py
pause
