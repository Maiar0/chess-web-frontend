<!-- src/views/PowerBIReport.vue -->
<template>
    <div class="dev-link-page">
        <div class="bg-layer"></div>

        <div class="content">
            <div class="report-card">
                <header class="card-header">
                    <h1>Sales Performance Report</h1>
                    <router-link to="/" class="home-button">Home</router-link>
                </header>

                <div class="iframe-box">
                    <iframe title="Presentation SalePerformance_Report"
                        src="https://app.powerbi.com/reportEmbed?reportId=aa858a6b-1af0-432a-90e1-0637c83c1277&autoAuth=true&ctid=305fcb47-f030-478f-9b6f-60a161d58705"
                        frameborder="0" allowfullscreen="true"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// No script needed
</script>

<style scoped>
:root {
    --grad-a: #11998e;
    --grad-b: #38ef7d;
    --ink-1: #2c3e50;
    --ink-2: #34495e;
    --text-muted: #4a5568;
    --card-bg: rgba(255, 255, 255, 0.9);
    --shadow: 0 8px 32px rgba(17, 153, 142, 0.15);
    --radius-xl: 20px;
}

.bg-layer {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, var(--grad-a) 0%, var(--grad-b) 100%);
    z-index: -1;
}

.content {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-family: Arial, sans-serif;
}

.report-card {
    width: min(1400px, 100%);
    background: var(--card-bg);
    backdrop-filter: blur(12px);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow);
    padding: 1.25rem 1.25rem 1.5rem;
    animation: fadeInUp 0.6s ease-out;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 0.75rem;
}

.card-header h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--ink-1), var(--ink-2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.home-button {
    text-decoration: none;
    color: #fff;
    background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
    padding: 0.6rem 1rem;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.home-button:hover {
    background: linear-gradient(135deg, var(--grad-b), var(--grad-a));
    transform: scale(1.05);
}

.iframe-box {
    width: 100%;
    aspect-ratio: 1140 / 541.25;
    border-radius: 12px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
}

@media (max-width: 480px) {
    .report-card {
        padding: 1rem;
        border-radius: 16px;
    }

    .card-header h1 {
        font-size: 1.2rem;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
