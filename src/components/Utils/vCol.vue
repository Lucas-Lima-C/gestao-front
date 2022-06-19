<template>
  <div :class="`form-group col-${dataLength[0] ? 'xs-'+dataLength[0] : '-xs-12'}
                    ${dataLength[1] ? 'col-sm-'+dataLength[1] : ''}
                    ${dataLength[2] ? 'col-md-'+dataLength[2] : ''}
                    ${dataLength[3] ? 'col-lg-'+dataLength[3] : ''}
                ${dataOffset[0] ? 'col-xs-offset-'+dataOffset[0] : ''}
                ${dataOffset[1] ? 'col-sm-offset-'+dataOffset[1] : ''}
                ${dataOffset[2] ? 'col-md-offset-'+dataOffset[2] : ''}
                ${dataOffset[3] ? 'col-lg-offset-'+dataOffset[3] : ''}

                     `">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VCol',
  props: ['length', 'offset'],
  computed: {
    dataLength: function(newValue) {
      return this.length.split('|')
    },
    dataOffset: function(newValue) {
      if (this.offset)
        return this.offset.split('|')

      return []
    },
  }
}
</script>

