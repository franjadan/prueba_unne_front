<template>
  <div>
    <h1>Asignaturas con profesores asociados</h1>
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
        data: [] as Array<{ id: number; subject: { id: number; name: string }; teacher: { id: number; name: string } }>,
        fields: [
          {key: 'id', label: '#'}, 
          {key: 'teacher.name', label: 'Profesor'},
          {key: 'subject.name', label: 'Asignatura'}
        ],
        actions: [],
    }
  },
  components: {
    Table
  },
  methods: {
    async getData(){
      await fetch(`${process.env.VUE_APP_API_URL}/subjects-with-teachers`)
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