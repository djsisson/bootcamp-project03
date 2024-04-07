# bootcamp-project03

Week 3 Project: Building an accessible image gallery

Requirements:

Planned out the UI
Display Thumbnail Images
Display Larger Images
Handle User Interaction

Stretch Goals:

Handle User Interaction using keyboard
add narration support to image description

Navigation and media queries:

different view depending if large medium or mobile as well as a srcset on images

can use tab
left / right arrow
click left / right arrow
click 1st or 3rd half of screen
click thumbnail or tab (thumbnail left/right appears at smaller screen sizes)
touch dots (on mobile screen sizes)
swipe left right on mobile screen sizes

External Sources:

Google, MDN, W3, Stackoverflow, Moodle

i mostly had issues due to smooth scrolling, in the end i switched it off
the issue being since i have main images being scrollable as well as thumbnails at smaller screen sizes
you cant have both items smooth scrolling as they cancel each other out, when one starts it stops whatever the other was doing. i tried using a resetable settimeout that fired after half a second after a scrollend event but it didn't look good.