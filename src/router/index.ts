import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StudyIndexView from '../views/Study/StudyIndexView.vue'
import StudyCreateView from '../views/Study/StudyCreateView.vue'
import StudyEditView from '../views/Study/StudyEditView.vue'
import SubjectIndexView from '../views/SubjectIndexView.vue'
import TeacherIndexView from '../views/TeacherIndexView.vue'
import SubjectTeacherIndexView from '../views/SubjectTeacherIndexView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'StudyList',
    component: StudyIndexView,
    meta: {
      title: 'Estudios'
    }
  },
  {
    path: '/estudios/nuevo',
    name: 'StudyCreate',
    component: StudyCreateView,
    meta: {
      title: 'Nuevo estudio'
    }
  },
  {
    path: '/estudios/:id/editar',
    name: 'StudyEdit',
    component: StudyEditView,
    meta: {
      title: 'Editar estudio'
    }
  },
  {
    path: '/estudio/:id/asignaturas',
    name: 'SubjectList',
    component: SubjectIndexView,
    meta: {
      title: 'Asignaturas'
    }
  },
  {
    path: '/profesores',
    name: 'TeacherList',
    component: TeacherIndexView,
    meta: {
      title: 'Profesores'
    }
  },
  {
    path: '/asignaturas-asociadas',
    name: 'SubjectTeacherList',
    component: SubjectTeacherIndexView,
    meta: {
      title: 'Asignaturas asociadas'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
