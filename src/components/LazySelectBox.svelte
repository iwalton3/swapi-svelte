<script>
    import { createEventDispatcher } from 'svelte';

    export let options;
    export let value;
    let focus = false;
    let editing = false;

    const dispatch = createEventDispatcher();
    function edit() {
        focus = true;
    }

    function abandon() {
        focus = false;
    }

    function commit() {
        focus = false;
        editing = false;
        dispatch("change", {});
    }
</script>

<span on:mouseenter={edit}
      on:click={edit}
      on:mouseleave={abandon}>
    {#if focus || editing}
        <select bind:value on:change={commit}
                           on:click={() => { editing = true; }}>
            {#each options as option}
                <option>{option}</option>
            {/each}
        </select>
    {:else}
        {value}
    {/if}
</span>