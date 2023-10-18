<template>
    <div>
        <div class="row">
            <div class="form-group col">
                <label for="inputName">Name <span class="text-danger">*</span></label>
                <input id="inputName" type="text" class="form-control" v-model="data.name">
                <div v-if="errors.name" class="form-error text-danger">{{ errors.name[0] }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    formData: {
        type: Object,
		default: () => ({
            name: "", 
		})
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      data: {
        name: "",
      } as {
        name: string;
      },
    };
  },
  watch: {
    formData: {
        immediate: true,
		handler(newValue: any, oldValue: any) {
			this.data = newValue;
		}
    }
  }
});
</script>
