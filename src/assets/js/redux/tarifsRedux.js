import {createSlice} from '@reduxjs/toolkit'
import icon_1 from '../../../assets/img/tariffs_1.svg'
import icon_2 from '../../../assets/img/tariffs_2.svg'
import icon_3 from '../../../assets/img/tariffs_3.svg'

export const tariffs = createSlice({
    name: 'tariffs',
    initialState: {
        blocks: {
            0: {
                title: 'Beginner',
                description: 'Для небольшого исследования',
                selected: false,
                class: 'orange',
                icon: icon_1,
                prices: {
                    current: '799 ₽',
                    old: '1 200 ₽',
                    priceTariff: '150',
                },
                include: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7']
            },
            1: {
                title: 'Pro',
                description: 'Для HR и фрилансеров',
                selected: false,
                class: 'blue',
                icon: icon_2,
                prices: {
                    current: '1 299 ₽',
                    old: '2 600 ₽',
                    priceTariff: '279',
                },
                include: ['Все пункты тарифа Beginner', 'Экспорт истории', 'Рекомендации по приоритетам']
            },
            2: {
                title: 'Business',
                description: 'Для корпоративных клиентов',
                selected: false,
                class: 'black',
                icon: icon_3,
                prices: {
                    current: '2 379 ₽',
                    old: '3 700 ₽',
                    priceTariff: '',
                },
                include: ['Все пункты тарифа Pro', 'Безлимитное количество запросов', 'Приоритетная поддержка']
            }
        }
    },
    reducers: {
        setActive: (state, action) => {
            state.blocks[action.payload].selected = true;
        },
    },
})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const {setActive} = tariffs.actions

export default tariffs.reducer