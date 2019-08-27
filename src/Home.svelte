<script>
    import Page from './router/Page.svelte';
    import AppList from './router/AppList.svelte';
    import UserTools from './auth/UserTools.svelte';

    import TopAppBar, {Row, Section, Title} from '@svelte-material-ui/top-app-bar';
    import IconButton from '@svelte-material-ui/icon-button';
    function doSomething() {
        alert('something');
    }
    let prominent = false;
    let dense = false;
    let secondaryColor = false;
    let clicked = 0;
</script>

<Page>
<TopAppBar variant="static"  {prominent} {dense} color={secondaryColor ? 'secondary' : 'primary'}>
    <Row>
        <Section>
            <IconButton class="material-icons">menu</IconButton>
            <Title>Static</Title>
         </Section>
         <Section align="end" toolbar>
            <IconButton class="material-icons" aria-label="Download">file_download</IconButton>
            <IconButton class="material-icons" aria-label="Print this page">print</IconButton>
            <IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>
          </Section>
    </Row>
</TopAppBar>
<IconButton class="material-icons" on:click={() => clicked++} ripple={false}>add_shopping_cart</IconButton> (no ripple)
    <AppList/>
    <UserTools/>
</Page>
