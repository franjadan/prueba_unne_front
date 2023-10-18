<template>
  <div class="card">
      <div class="card-header"><h4>Editar el estudio #{{ $route.params.id }}</h4></div>
      <div class="card-body">
          <form @submit.prevent="editData">
              <StudyForm :formData="data" :errors="errors" />

              <div class="mt-3">
                  <button type="submit" class="btn btn-success"><i class="fas fa-save"></i> Guardar </button>
              </div>
          </form>
      </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import StudyForm from '@/components/StudyForm.vue';
  import Swal from 'sweetalert2'

  export default defineComponent({
      name: "StudyEditView",
      mounted() {
        this.getData();
      },
      data(){
          return {
              errors: [],
              data: {
                  name: "",
              }
          }
      },
      components: {
        StudyForm
      },
      methods: {
        async getData(){
          await fetch(`${process.env.VUE_APP_API_URL}/studies/${this.$route.params.id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error al consultar la API');
              }
              return response.json();
            })
            .then((responseData) => {
              const {name} = responseData;
              this.data.name = name;

              console.log(this.data.name);
            })
            .catch((error) => {
              console.log(error);
            })
        },
        async editData(){
          await fetch(`${process.env.VUE_APP_API_URL}/studies/${this.$route.params.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(this.data)
            })
            .then((response) => {
              if(!response.ok && response.status != 422){
                throw new Error('No se ha podido conectar con la API');
              }else{
                return response.json();
              }
            })
            .then((responseData) => {
              this.errors = [];

              if (responseData.errors) {
                  this.errors = responseData.errors;
              }else{

                Swal.fire(
                  'La operación se ha realizado con éxito',
                  '',
                  'success'
                );

                this.$router.push({name:'StudyList'});
              }

            }).catch(error => {
                Swal.fire(
                    'Ha ocurrido un error inesperado',
                    error.message,
                    'error'
                );
                console.log(error);
            })
        }
      }
  });
</script>

