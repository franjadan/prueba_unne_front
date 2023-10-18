<template>
    <div>
        <h1>Asignaturas del estudio #{{ $route.params.id }}</h1>
        <Table :fields="fields" :data="data" :actions="actions"></Table>

        <div class="mt-3">
            <router-link class="btn btn-outline-secondary" :to="{name: 'StudyList'}"><i class="fas fa-arrow-left"></i> Volver al listado de estudios</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';

export default defineComponent({
  name: 'SubjectIndexView',
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
        const studyId = this.$route.params.id;
        await fetch(`${process.env.VUE_APP_API_URL}/studies/${studyId}/subjects`)
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