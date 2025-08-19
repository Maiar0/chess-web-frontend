<template>
    <div class="captured-pieces" :data-side="side">
        <div v-for="(p, i) in pieces" :key="i" class="captured-square">
            <img v-if="pieceImageMap[p]" :src="pieceImageMap[p]" :alt="p" />
            <span v-else>{{ p }}</span>
        </div>
    </div>
</template>
<script setup>
import { defineProps, watch } from 'vue'

const props = defineProps({
    side: {
        type: String,
        required: true
    },
    pieces: {
        type: Array,
        required: true
    }
})
watch(
    () => props.pieces,
    newVal => {
        console.log(`[CapturedPieces:${props.side}] pieces changed:`, newVal)
    },
    { immediate: true }   // also fire once immediately
)
const pieceImageMap = {
    K: '/chesssprites/wk.png',
    Q: '/chesssprites/wq.png',
    R: '/chesssprites/wr.png',
    B: '/chesssprites/wb.png',
    N: '/chesssprites/wn.png',
    P: '/chesssprites/wp.png',
    k: '/chesssprites/bk.png',
    q: '/chesssprites/bq.png',
    r: '/chesssprites/br.png',
    b: '/chesssprites/bb.png',
    n: '/chesssprites/bn.png',
    p: '/chesssprites/bp.png',
};

</script>
<style scoped>
.captured-pieces {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(17, 153, 142, 0.3);
    border-radius: 0.5rem;
    min-width: 120px;
    max-width: 140px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.captured-square {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border: 1px solid #ddd;
    font-size: 1.25rem;
    user-select: none;
    border-radius: 0.25rem;
    position: relative;
}

.captured-square img {
    width: 75%;
    height: 75%;
    object-fit: contain;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.captured-square span {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
}

/* Side-specific styling */
.captured-pieces[data-side="white"] {
    border-left: 4px solid #11998e;
}

.captured-pieces[data-side="black"] {
    border-left: 4px solid #0d7a6b;
}

@media (max-width: 768px) {
    .captured-pieces {
        min-width: 100px;
        max-width: 120px;
        padding: 0.25rem;
    }

    .captured-square {
        width: 1.8rem;
        height: 1.8rem;
    }
}

@media (max-width: 600px) {
    .captured-pieces {
        order: 2;
        min-width: 80px;
        max-width: 100px;
    }

    .captured-square {
        width: 1.6rem;
        height: 1.6rem;
    }
}
</style>
