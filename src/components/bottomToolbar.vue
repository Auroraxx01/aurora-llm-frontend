
<template>
    <div class="">
        <Toolbar>
            <template #start>
                <div class="flex justify-center">
                    <Toast />
                    <FileUpload mode="basic" name="file" url="/v1/upload" @upload="onUpload" :auto="true" chooseLabel="Upload" />
                </div>
            </template>
            <template #center>
                <div><Textarea placeholder="Chat here ~" rows="2" cols="100" minlength="30" maxlength="100" autoResize fluid/></div>
            </template>
            <template #end> <Button label="Send" :loading="loading"></Button></template>
        </Toolbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false, // todo, make it true when sending and wait for response
        };
    },
    methods: {
        onUpload() {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },
    }
};
</script>
