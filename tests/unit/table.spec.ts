import { shallowMount, VueWrapper } from '@vue/test-utils';
import Table from '@/components/Table.vue';

describe('Table', () => {
  // Define una función para crear un wrapper del componente
  const createTableWrapper = (propsData: any = {}) => {
    return shallowMount(Table, {
      props: propsData,
    });
  };

  // Prueba si el componente se renderiza correctamente
  it('renders the component', () => {
    const wrapper: VueWrapper<any> = createTableWrapper({
      fields: [{ label: 'Name', key: 'name' }],
      data: [{ name: 'John' }],
      actions: [],
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('table').exists()).toBe(true);
  });

  // Prueba la funcionalidad de getProperty
  it('returns the correct property value', () => {
    const wrapper: VueWrapper<any> = createTableWrapper();
    const item = { name: 'John', age: 30 };

    // Llama a la función getProperty del componente y verifica el resultado
    expect(wrapper.vm.getProperty(item, 'name')).toBe('John');
    expect(wrapper.vm.getProperty(item, 'age')).toBe(30);
    expect(wrapper.vm.getProperty(item, 'address.city')).toBe('');
  });

  // Prueba la funcionalidad de performAction
  it('performs the action correctly', () => {
    const wrapper: VueWrapper<any> = createTableWrapper();
    const item = { name: 'John' };
    const action = {
      class: 'btn-primary',
      html: 'Edit',
      handler: jest.fn(), // Usamos una función simulada para verificar si se llama
    };

    // Llama a la función performAction y verifica si se llama la función de manejo (handler)
    wrapper.vm.performAction(action, item);
    expect(action.handler).toHaveBeenCalledWith(item);
  });
});