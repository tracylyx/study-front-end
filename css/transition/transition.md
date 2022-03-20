## transition
> 不用使用js就可以通过css时间简单的动画交互效果

### 复合属性
- transition-property
  - default: all
  - 过度属性
- transition-duration
  - default： 0s
  - 过度持续时间
  - 必传 且 不能为0
- transition-timing-function
  - default：ease函数
  - 过度函数，支持 关键字、cubic-bezier()贝塞尔曲线函数、steps()函数
- transition-delay
  - default：0s
  - 过度延迟时间，间隔delay的时间再动起来

### 空格隔开
空格隔开，表示设置的为属性的自属性
逗号隔开，表示不同的属性

### 写法注意事项
- duration、delay，设置的都是时间，如果两个同时设置。第一个为duration，第二个为delay
  - 如: transition: 1s 2s，表示持续时间为1s，延迟时间为2s
  
### 浏览器支持情况
- 不支持
    - <= IE9
    - <= Firefox 3.6
    - opera 10.1 