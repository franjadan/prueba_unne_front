<template>
    <div class="table-responsive">
        <table id="dtt" class="table">
            <thead>
                <tr class="text-center">
                    <th scope="col" v-for="(field, index) in fields" :key='index' > 
                        {{ field.label }} 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="data != undefined && data?.length > 0" class="text-center" v-for="item in data" :key='item'>
                    <td v-for="(field, index) in fields.filter(item => item.key !== null)" :key='index' >{{ getProperty(item, field.key) }}</td>
                    <td v-if="actions?.length != undefined && actions?.length > 0">
                        <button v-for="(action, index) in actions" :key="index" :class="action.class" @click="performAction(action, item as object)" v-html="action.html"></button>
                    </td>
                </tr>
                <tr class="text-center" v-else>
                    <td :colspan="fields?.length">No hay datos para mostrar en la tabla</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script lang="ts">
    import { defineComponent } from 'vue';
    import $ from 'jquery';
    import 'datatables.net';
    import 'datatables.net-bs5';

    export default defineComponent({
        name: 'Table',
        props: {
            fields: {
                type: Array
            },
            data: {
                type: Array
            },
            actions: {
                type: Array
            }
        },
        data(){
            return {
                datatable: null as any
            }
        },
        watch: {
            data: {
                immediate: true,
                handler(newData) {
                    if(this.data != undefined && this.data?.length > 0){
                        if(this.datatable != null){
                            this.datatable.destroy();
                            this.datatable = null;
                        }
                        
                        this.$nextTick(() => {
                            this.datatable = $('#dtt').DataTable({
                                language: {
                                    url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
                                },
                            });
                        });
                    }
                    
                },
            },
        },
        methods: {
            getProperty(item: any, property: string): any {
                const parts = property.split(".");
                
                let value = item;
                for (const part of parts) {
                    if (value && value[part]) {
                    value = value[part];
                    } else {
                    value = ""; // Manejar casos en los que la propiedad no existe
                    break;
                    }
                }

                return value;
            },

            performAction(action: any, item: object) {
                action.handler(item);
            }
        }
    });
</script>
