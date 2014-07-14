@echo off
set InstallTo="C:\Program Files\Google\Chrome\extension\MantisSpeeder"
xcopy . %InstallTo% /s /e /i /y

echo .
echo .
echo please note below path, and put to Chrome. 
echo %InstallTo% 
pause
