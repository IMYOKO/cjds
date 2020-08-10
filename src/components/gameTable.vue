<template>
    <table class="ds-index-kj-qs-tb" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td v-for="(itemlist, index) in kj_data" :key='index'>
            <div
                :key='`${kjindex}s`'
                v-for="(kjlist, kjindex) in itemlist"
            >
                <span
                v-if="kjlist[0]>0"
                :class="!kjlist[2] ? 'bg-bf0d0b' : 'bg-0544b8'"
                >{{ kjlist[0] }}:{{ kjlist[1] }}</span>
            </div>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    props: {
        kj_data: Array
    }
}
</script>

<style lang="less" scoped>
</style>
