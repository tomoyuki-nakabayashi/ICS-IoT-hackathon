# -*- coding: utf-8 -*-
import cv2

 # device number "0"
cap = cv2.VideoCapture(0)

while(True):
 # Capture a frame
 ret, frame = cap.read()

 # show on display
 cv2.imshow('frame',frame)

 # waiting for keyboard input
 key = cv2.waitKey(1) & 0xFF

 # Exit if "q" pressed
 if key == ord('q'):
  break
 # Save if "s" pressed
 if key == ord('s'):
  path = "photo.jpg"
  cv2.imwrite(path,frame)

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
