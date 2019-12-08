<script>
    import Select, {Option} from '@smui/select';

    export let options;
    export let value;
    export let name;
</script>

<Select bind:value label={name}>
    <Option value={undefined}/>
    {#each options as option}
        <Option value={option} selected={value == option}>{option}</Option>
    {/each}
</Select>