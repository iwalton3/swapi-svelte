<script>
    export let options;
    export let value;
</script>

<select bind:value on:change>
    {#each options as option}
        <option>{option}</option>
    {/each}
</select>