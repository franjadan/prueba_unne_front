<template>
  <div class="card">
      <div class="card-header"><h4>Registrar un nuevo estudio </h4></div>
      <div class="card-body">
          <form @submit.prevent="storeData">
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
        async storeData(){
          await fetch(`${process.env.VUE_APP_API_URL}/studies/`,
            {
                method: 'POST',
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

