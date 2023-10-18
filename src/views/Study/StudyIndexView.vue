<template>
  <div>
    <h1>Estudios</h1>

    <div class="my-3">
      <router-link :to="{name: 'StudyCreate'}" class="btn btn-sm btn-outline-success"><i class="fas fa-plus"></i> Nuevo estudio</router-link>
    </div>

    <Table :fields="fields" :data="data" :actions="actions"></Table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Swal from 'sweetalert2'

export default defineComponent({
  name: 'StudyIndexView',
  mounted(){
    this.getData();
  },
  data(){
    return {
      data: [] as Array<{ id: number; name: string }>,
      fields: [
        {key: 'id', label: '#'}, 
        {key: 'name', label: 'Nombre'},
        {key: null, label: 'Acciones'}
      ],
      actions: [
        {
          class: "btn btn-sm btn-outline-info",
          html: "<i class='fas fa-eye' title='Ver asignaturas'></i>",
          handler: (item: any) => {
            this.$router.push({ name: 'SubjectList', params: { id: item.id } });
          }
        },
        {
          class: "ms-1 btn btn-sm btn-outline-primary",
          html: "<i class='fas fa-edit' title='Editar registro'></i>",
          handler: (item: any) => {
            this.$router.push({ name: 'StudyEdit', params: { id: item.id } });
          }
        },
        {
          class: "ms-1 btn btn-sm btn-outline-danger",
          html: "<i class='fas fa-trash' title='Eliminar registro'></i>",
          handler: (item: any) => {
            this.deleteData(item.id);
          }
        }
      ],
    }
  },
  components: {
    Table
  },
  methods: {
    async getData(){
      await fetch(`${process.env.VUE_APP_API_URL}/studies`)
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
    deleteData(id: number){
      Swal.fire({
        title: '¿Está seguro de eliminar el registro?',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          
          let data = this.data; // Guarda la copia de los datos antes de eliminar

          fetch(`${process.env.VUE_APP_API_URL}/studies/${id}`, {method: 'DELETE'})
            .then((response) => {
              if(!response.ok){
                throw new Error('Error al conectar la api');
              }
              return response.json();
            })
            .then((responseData) => {
              Swal.fire(
                'La operación se ha realizado con éxito',
                '',
                'success'
              );

              this.data = data.filter(item => item.id !== id); // Actualiza los datos después de eliminar el registro

            }).catch((error) => {
              Swal.fire(
                  'Ha ocurrido un error inesperado',
                  error.message,
                  'error'
              );
              console.log(error);
            })
        } 
      })
    }
  }
});
</script>