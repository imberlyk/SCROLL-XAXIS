var lastPos = window.scrollY,
    zSpacing = -1000, // The distance between frames on the Z axis
    zVals = [], // To store the Z positions of each frame
    $frames = document.querySelectorAll(".frame"), // Selecting all frames
    frames = Array.from($frames), // Convert NodeList to array
    scrollMsg = document.getElementById("instructions-overlay"),
    numFrames = frames.length;

// Initialize Z positions for each frame
frames.forEach(function (frame, i) {
    zVals.push((numFrames - i) * zSpacing);
    frame.style.transform = `translateZ(${zVals[i]}px)`; // Set initial Z position
});

window.addEventListener("scroll", function () {
    var top = window.scrollY, // Get the current scroll position
        delta = lastPos - top; // Calculate the change in scroll position
    lastPos = top; // Update the last position

    // Loop through each frame and adjust its Z position and appearance
    frames.forEach(function (frame, i) {
        zVals[i] += delta * -1.5; // Adjust Z position by the scroll delta
        var transform = `translateZ(${zVals[i]}px)`; // Apply the Z position as a 3D transform
        var opacity = zVals[i] < 200 ? 1 : 1 - parseInt((zVals[i] - 200) / 800 * 10) / 10; // Calculate opacity based on Z position
        var display = zVals[i] > 1000 ? "none" : "block"; // Hide frame if too far away

        // Apply the transform, opacity, and display styles to the frame
        frame.style.transform = transform;
        frame.style.display = display;
        frame.style.opacity = opacity;
    });

    // Remove the instructions overlay once the last frame moves into view
    if (scrollMsg && zVals[numFrames - 1] > 200) {
        scrollMsg.parentNode.removeChild(scrollMsg); // Remove overlay
        scrollMsg = null; // Set to null to prevent further checks
    }
});
