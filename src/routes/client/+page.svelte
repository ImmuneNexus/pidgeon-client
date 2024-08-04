<script>
    import { onMount } from "svelte";

    let audioContext = null;
    let mediaStreamSource = null;
    let scriptProcessor = null;
    let ws = null;
    let recording = false;

    onMount(async () => {
        try {
            // Check for microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Set up WebSocket connection
            ws = new WebSocket('ws://localhost:8765');
            ws.binaryType = 'arraybuffer';

            ws.onopen = () => {
                console.log('WebSocket connection opened');
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
            };
        } catch (error) {
            console.error('Error initializing WebSocket or getting microphone access:', error);
        }
    });

    const startRecording = async () => {
        if (recording) return;
        recording = true;

        try {
            // Create a new AudioContext
            audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Create MediaStreamSource
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamSource = audioContext.createMediaStreamSource(stream);

            // Create ScriptProcessorNode
            scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
            mediaStreamSource.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);

            // Event handler for audio processing
            scriptProcessor.onaudioprocess = event => {
                const inputBuffer = event.inputBuffer.getChannelData(0);
                const pcmData = new Int16Array(inputBuffer.length);
                for (let i = 0; i < inputBuffer.length; i++) {
                    pcmData[i] = Math.max(-1, Math.min(1, inputBuffer[i])) * 32767;
                }
                ws.send(pcmData.buffer);
            };

            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = async () => {
        if (!recording) return;
        recording = false;

        try {
            // Disconnect the ScriptProcessorNode and MediaStreamSource
            if (scriptProcessor) scriptProcessor.disconnect();
            if (mediaStreamSource) mediaStreamSource.disconnect();

            // Close the AudioContext
            if (audioContext) audioContext.close();

            console.log('Recording stopped');
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };
</script>

<div>
    <button on:click={startRecording}>Start</button>
    <button on:click={stopRecording}>Stop</button>
</div>
