import cv2
c = cv2.VideoCapture(0)
r, img = c.read()
cv2.imwrite('photo.jpg', img)
print "end"
