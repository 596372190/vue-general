<!-- =========================================================================================
    File Name: VxCard.vue
    Description: Card Component
    Component Name: VxCard
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

 <template>
    <div class="vx-card" ref="card" :class="[
        {'overflow-hidden': tempHidden},
        {'no-shadow': noShadow},
        {'rounded-none': noRadius},
        {'card-border': cardBorder},
        cardClasses ]" :style="cardStyles"
        v-on="$listeners">
        <div class="vx-card__header" v-if="hasHeader">

            <!-- card title -->
            <div class="vx-card__title">
                <h4 v-if="this.$props.title" :style="titleStyles" :class="titleClasses">{{ title }}</h4>
                <h6 v-if="this.$props.subtitle" :style="subtitleStyles" :class="subtitleClasses">{{ subtitle }}</h6>
            </div>

            <!-- card actions -->
            <div class="vx-card__actions" v-if="hasAction">
                <slot name="actions">
                    <div class="vx-card__action-buttons" v-if="(actionButtons || collapseAction || refreshContentAction || removeCardAction) && !codeToggler">
                        <feather-icon @click="toggleContent" icon="ChevronUpIcon" :class="{rotate180: !isContentCollapsed}" class="ml-4" v-if="actionButtons || collapseAction" />
                        <feather-icon @click="refreshcard" icon="RotateCwIcon" class="ml-4" v-if="actionButtons || refreshContentAction" />
                        <feather-icon @click="removeCard" icon="XIcon" class="ml-4" v-if="actionButtons || removeCardAction" />
                    </div>
                    <div class="vx-card__code-toggler sm:block hidden" v-if="codeToggler && !actionButtons">
                        <feather-icon icon="CodeIcon" :class="{'border border-solid border-primary border-t-0 border-r-0 border-l-0': showCode}" @click="toggleCode"></feather-icon>
                    </div>
                </slot>
            </div>
        </div>

        <div class="vx-card__collapsible-content vs-con-loading__container" ref="content" :class="[{collapsed: isContentCollapsed}, {'overflow-hidden': tempHidden}]" :style="StyleItems">

            <!-- content with no body(no padding) -->
            <slot name="no-body"></slot>

            <!-- content inside body(with padding) -->
            <div class="vx-card__body" v-if="this.$slots.default">
                <slot></slot>
            </div>

            <!-- content with no body(no padding) -->
            <slot name="no-body-bottom"></slot>

            <div class="vx-card__footer" v-if="this.$slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>

    </div>
</template>

<script>
import _color from '@/assets/utils/color.js'
export default{
    name: 'vx-card',
    props: {
        title: String,
        subtitle: String,
        actionButtons: {
            type: Boolean,
            default: false,
        },
        actionButtonsColor: {
            type: String,
            default: "success",
        },
        codeToggler: {
            type: Boolean,
            default: false,
        },
        noShadow: {
            default: false,
            type: Boolean,
        },
        noRadius: {
            default: false,
            type: Boolean,
        },
        cardBorder: {
            default: false,
            type: Boolean,
        },
        codeLanguage: {
            default: "markup",
            type: String,
        },
        collapseAction: {
            default: false,
            type: Boolean
        },
        refreshContentAction: {
            default: false,
            type: Boolean
        },
        removeCardAction: {
            default: false,
            type: Boolean
        },
        headerBackground: {
          default: '',
          type: String
        },
        // bodyBackground: {
        //   default: '',
        //   type: String
        // },
        // headerbackground: {
        //   default: '',
        //   type: String
        // },
        cardBackground: {
          default: '',
          type: String
        },
        contentColor: {
          default: '',
          type: String
        },
        titleColor: {
          default: '',
          type: String
        },
        subtitleColor: {
          default: '#b8c2cc',
          type: String
        }
    },
    data() {
        return {
            isContentCollapsed: false,
            showCode: false,
            maxHeight: null,
            cardMaxHeight: null,
            codeContainerMaxHeight: '0px',
            tempHidden: false,
        }
    },
    computed: {
        hasAction() {
            return this.$slots.actions || (this.actionButtons || this.collapseAction || this.refreshContentAction || this.removeCardAction || this.codeToggler)
        },
        hasHeader() {
            return this.hasAction || (this.title || this.subtitle)
        },
        StyleItems() {
            return { maxHeight: this.maxHeight }
        },
        cardStyles() {
            let obj = { maxHeight: this.cardMaxHeight }
            if (!_color.isColor(this.cardBackground)) obj.background = _color.getColor(this.cardBackground)
            if (!_color.isColor(this.contentColor)) obj.color = _color.getColor(this.contentColor)
            return obj
        },
        codeContainerStyles() {
            return { maxHeight: this.codeContainerMaxHeight }
        },
        cardClasses() {
          let str = ''

          // Add bg class
          if(_color.isColor(this.cardBackground)) {
            str += ` bg-${this.cardBackground}`
          }

          // add content color
          if (_color.isColor(this.contentColor)){
            str += ` text-${this.contentColor}`
          }

          return str.trim()
        },
        titleStyles() {
          return {
            color: _color.getColor(this.titleColor)
          }
        },
        titleClasses() {
          let str = ''

          // add content color
          if(_color.isColor(this.titleColor)) {
            str += ` text-${this.titleColor}`
          }

          return str.trim()
        },
        subtitleStyles() {
          let obj = {}
          if (!_color.isColor(this.subtitleColor)) obj.color = _color.getColor(this.subtitleColor)

          return obj
        },
        subtitleClasses() {
          let str = ''

          // add content color
          if(_color.isColor(this.subtitleColor)) {
            str += ` text-${this.subtitleColor}`
          }

          return str.trim()
        },
    },
    methods: {
        toggleContent() {
            this.$refs.content.style.overflow = "hidden"
            let scrollHeight = this.$refs.content.scrollHeight
            if (this.maxHeight == '1.5rem') {
                this.maxHeight = `${scrollHeight}px`
                setTimeout(() => {
                    this.maxHeight = 'none'
                    this.$refs.content.style.overflow = null
                }, 300)
            } else {
                this.maxHeight = `${scrollHeight}px`
                setTimeout(() => {
                    this.maxHeight = `1.5rem`
                    this.$refs.content.style.overflow = null
                }, 50)
            }
            this.isContentCollapsed = !this.isContentCollapsed
            this.$emit("toggleCollapse", this.isContentCollapsed)
        },
        refreshcard() {
            this.$vs.loading({
                container: this.$refs.content,
                scale: 0.5,
            })
            this.tempHidden = true
            this.$emit("refresh", this)
        },
        removeRefreshAnimation(time=100) {
            setTimeout( ()=> {
                this.$vs.loading.close(this.$refs.content)
                this.tempHidden = false
            }, time)
        },
        removeCard() {
            let scrollHeight = this.$refs.card.scrollHeight
            this.cardMaxHeight = `${scrollHeight}px`
            this.$el.style.overflow = "hidden"
            setTimeout(() => {
                this.cardMaxHeight = `0px`
            }, 50)
            this.$emit("remove")
        },
        toggleCode() {
            this.tempHidden = true
            this.showCode = !this.showCode
            let scrollHeight = this.$refs.codeContainer.scrollHeight
            if (this.codeContainerMaxHeight == '0px') {
                this.codeContainerMaxHeight = `${scrollHeight}px`
                setTimeout(() => {
                    this.codeContainerMaxHeight = 'none'
                    this.tempHidden = false
                }, 300)
            } else {
                this.codeContainerMaxHeight = `${scrollHeight}px`
                setTimeout(() => {
                    this.codeContainerMaxHeight = `0px`
                    this.tempHidden = false
                }, 150)
            }
        },
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>
    .vx-card{
        width: 100%;
        background: #e1e3f5;
        border-radius: .5rem;
        display: block;
        box-shadow: 0px 4px 25px 0px rgba(0,0,0,.1);
        position: relative;
        transition: all .3s ease-in-out;

        &.no-shadow { box-shadow: none; }
        &.card-border { border: 1px solid #e4e4e4;  }

        .vx-card__header {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 1.5rem 1.5rem 0;
            .vx-card__title {
                h4 + h6 {
                    margin-top: .3rem;
                }

                h6 {
                    font-weight: 400;
                }
            }
            .vx-card__actions {
                .vx-card__action-buttons {
                    display: flex;

                    & .feather-icon {
                        margin-left: .5rem;
                    }
                }
                svg {
                    transition: all .25s ease-out;
                    height: 1rem;
                    width: 1rem;
                    cursor: pointer;
                }
                .rotate180 > svg{
                    transform: rotate(180deg) !important;
                }
            }
        }

        img.card-img-top{
            border-top-left-radius: .5rem;
            border-top-right-radius: .5rem;
        }

        .vx-card__collapsible-content {
            transition: all .3s ease-in-out;

            &.vs-con-loading__container {
                overflow: unset;
            }

            &.collapsed {
                opacity: 0;
                transform: scale(0.99);
            }

            .card-overlay {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                padding: 1.25rem;

                > * {
                    position: relative;
                    z-index: 1;
                }

                &::after{
                    position: absolute;
                    content: "";
                    top: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    height: 100%;
                    width: 100%;
                    background: rgba(0,0,0,.60);
                    z-index: 0;
                }
            }

            .vx-card__body {
                padding: 1.5rem;

                img + .vx-card__title > h4 { margin-top: 1.5rem }

            }
            img { display: block }
        }

        .vx-card__code-container {
            overflow: hidden;
            transition: transform 0.35s, opacity .15s, max-height .30s ease-out;

            &.collapsed {
                opacity: 0;
                transform: translateY(100%);
            }

            .code-content {
                margin: 1.5rem;

                pre[class^="language-"] {
                    max-height: 350px;
                    border-radius: .5rem;
                    margin-bottom: 0;
                }
            }
        }

        .vx-card__footer {
            padding: 0 1.5rem 1.5rem;
        }
    }
</style>
