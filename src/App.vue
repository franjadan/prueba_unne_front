<template>
  <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <div class="sidebar border-right" id="sidebar-wrapper">
          <div class="sidebar-heading text-center">
              <router-link class="navbar-brand" to="/"><img src="./assets/logo.png" height="100" alt="Logo"></router-link>
          </div>

          <div class="list-group list-group-flush mt-3">
            <router-link class="list-group-item list-group-item-action text-white lead dropdown-item" :to="{name: 'StudyList'}">Estudios</router-link>
            <router-link class="list-group-item list-group-item-action text-white lead dropdown-item" :to="{name: 'TeacherList'}">Profesores</router-link>
            <router-link class="list-group-item list-group-item-action text-white lead dropdown-item" :to="{name: 'SubjectTeacherList'}">Asignaturas asociadas a profesores</router-link>

          </div>
      </div>

      <div id="page-content-wrapper">
          <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid">
                  <button @click.prevent="toggleSidebar" class="btn btn-toggle me-2"><i class="fas fa-bars"></i></button>
              </div>
          </nav>

          <div class="container-fluid my-4 px-4 py-4">
              <router-view></router-view>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
  export default {
 
  data() {
      return {
          currentRoute: null, // Almacena la ruta actual
      };
  },
  methods: {
      toggleSidebar(event: MouseEvent) {
          const element = document.querySelector('#wrapper');

          if(element)
            element.classList.toggle('toggled');
        
      }
  }
}
</script>

