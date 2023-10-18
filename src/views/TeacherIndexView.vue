<template>
    <div>
        <h1>Profesores</h1>
        <Table :fields="fields" :data="data" :actions="actions"></Table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';

export default defineComponent({
    name: 'TeacherIndexView',
    mounted(){
        this.getData();
    },
    data(){
        return {
            data: [] as Array<{ id: number; name: string }>,
            fields: [
                {key: 'id', label: '#'}, 
                {key: 'name', label: 'Nombre'}
            ],
            actions: [],
        }
    },
    components: {
        Table
    },
    methods: {
        async getData(){
            await fetch(`${process.env.VUE_APP_API_URL}/teachers`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al consultar la API');
                    }
                    return response.json();
                })
                .then((responseData) => {
                    this.data = responseData;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
    }
});
</script>