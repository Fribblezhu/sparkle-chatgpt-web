<template>
  <div class="text-black">
    <template v-if="!text">
      <span class="dark:text-white w-[4px] h-[20px] block animate-blink"/>
    </template>
    <template v-else>
      <div class="leading-relaxed break-words">
        <div class="markdown-body" v-html="html"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mdi from '@/lib/markdown_util'

export default defineComponent({
  name: 'markdown-text',
  props: {
    messageId: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      html: mdi.render(this.text)
    }
  },
  watch: {
    text (val) {
      this.renderText(val)
    }
  },
  methods: {
    renderText (text: string) {
      this.html = mdi.render(text)
    }
  }
})
</script>

<style lang="less">
.markdown-body {
  background-color: transparent;
  font-size: 14px;
  text-align: left;

  p {
    white-space: pre-wrap;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  pre code,
  pre tt {
    line-height: 1.65;
  }

  .highlight pre,
  pre {
    background-color: #fff;
  }

  code.hljs {
    padding: 0;
  }

  .code-block {
    &-wrapper {
      position: relative;
      padding-top: 24px;
    }

    &-header {
      position: absolute;
      top: 5px;
      right: 0;
      width: 100%;
      padding: 0 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #b3b3b3;

      &__copy {
        cursor: pointer;
        margin-left: 0.5rem;
        user-select: none;

        &:hover {
          color: #65a665;
        }
      }
    }
  }

}

html.dark {

  .whitespace-pre-wrap {
    white-space: pre-wrap;
    color: var(--n-text-color);
  }

  .highlight pre,
  pre {
    background-color: #282c34;
  }
}

</style>
