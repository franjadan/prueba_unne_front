import { shallowMount, VueWrapper } from '@vue/test-utils';
import StudyForm from '@/components/StudyForm.vue'; // Ajusta la ruta a tu componente

describe('StudyForm', () => {
  const createComponent = (propsData: any = {}) => {
    return shallowMount(StudyForm, {
      props: propsData,
    });
  };

  it('renders the component with initial data', () => {
    const formData = {
      name: 'John',
    };

    const errors = {
      name: ['El campo Nombre es obligatorio.'],
    };

    const wrapper: VueWrapper<any> = createComponent({
      formData,
      errors,
    });

    // Verifica que el componente se haya renderizado correctamente
    expect(wrapper.exists()).toBe(true);

    // Verifica que el campo "Name" tenga el valor correcto y que se muestren errores si es necesario
    const inputName = wrapper.find('#inputName');
    const errorElement = wrapper.find('.form-error');

    expect(inputName.exists()).toBe(true);
    expect((inputName.element as HTMLInputElement).value).toBe(formData.name);

    expect(errorElement.exists()).toBe(true);
    expect(errorElement.text()).toBe(errors.name[0]);
  });

  it('updates data when formData prop changes', async () => {
    const initialData = {
      name: 'John',
    };

    const updatedData = {
      name: 'Doe',
    };

    const wrapper: VueWrapper<any> = createComponent({
      formData: initialData,
    });

    expect(wrapper.vm.data.name).toBe(initialData.name);

    await wrapper.setProps({
      formData: updatedData,
    });

    expect(wrapper.vm.data.name).toBe(updatedData.name);
  });
});