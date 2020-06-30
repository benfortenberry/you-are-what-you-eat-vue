<template>
  <div>
    <div id="nav">
      <header class="usa-header usa-header--basic usa-header--megamenu">
        <div class="usa-nav-container">
          <div class="usa-navbar">
            <div class="usa-logo" id="basic-mega-logo">
              <em class="usa-logo__text">
                <font-awesome-icon icon="utensils" class="margin-right-1" />You Are What You Eat
              </em>
            </div>
          </div>
        </div>
      </header>
    </div>
    <div>
      <div>
        <div class="tablet:grid-col">
          <section class="usa-hero" aria-label="Introduction">
            <div class="grid-container">
              <div class="usa-hero__callout">
                <h1 class="usa-hero__heading">
                  <span class="usa-hero__heading--alt">To get started logging your meals, sign in:</span>
                </h1>
                <div id="firebaseui-auth-container"></div>
              </div>
            </div>
          </section>

          <section class="grid-container usa-section">
            <div class="grid-row grid-gap">
              <div class="tablet:grid-col-4">
                <h2
                  class="font-heading-xl margin-top-0 tablet:margin-bottom-0"
                >What Did You Eat Last Tuesday for Lunch?</h2>
              </div>
              <div class="tablet:grid-col-8 usa-prose">
                <p>
                  Diet is the most important factor in maintaining health. Sadly, many eat without
                  a concious goal in mind other than not being hungry.
                </p>
                <p>
                  Keeping a food diary can help keep you on track with your nutrition
                  by creating a record of your meals. In order to get where you want to be, you should know where you've been.
                </p>
              </div>
            </div>
          </section>

          <section class="usa-graphic-list usa-section usa-section--dark">
            <div class="grid-container">
              <div class="usa-graphic-list__row grid-row grid-gap">
                <div class="usa-media-block tablet:grid-col">
                  <span class="usa-media-block__img food-icon">
                    <font-awesome-icon icon="bacterium" />
                  </span>
                  <div class="usa-media-block__body">
                    <h2 class="usa-graphic-list__heading">Feeding Gut Bacteria Is Critical.</h2>
                    <p>In recent years, research has shown that the types and number of these bacteria can have profound implications for human health — affecting everything from body weight to brain function.</p>
                  </div>
                </div>
                <div class="usa-media-block tablet:grid-col">
                  <span class="usa-media-block__img food-icon">
                    <font-awesome-icon icon="cookie" />
                  </span>
                  <div class="usa-media-block__body">
                    <h2 class="usa-graphic-list__heading">Junk Food Can Be Addictive.</h2>
                    <p>
                      In the past 100 years or so, food has changed. People are eating more processed food than ever before, and the technologies used to
                      engineer foods have become more elaborate.
                    </p>
                  </div>
                </div>
              </div>
              <div class="usa-graphic-list__row grid-row grid-gap">
                <div class="usa-media-block tablet:grid-col">
                  <span class="usa-media-block__img food-icon">
                    <font-awesome-icon icon="ice-cream" />
                  </span>
                  <div class="usa-media-block__body">
                    <h2 class="usa-graphic-list__heading">Low-Fat Doesn’t Mean Healthy.</h2>
                    <p>
                      The low-fat diet promoted by the mainstream nutrition guidelines seems to have been a failure.
                      Numerous long-term studies suggest that it neither works for weight loss nor disease prevention.
                    </p>
                  </div>
                </div>
                <div class="usa-media-block tablet:grid-col">
                  <span class="usa-media-block__img food-icon">
                    <font-awesome-icon icon="weight" />
                  </span>
                  <div class="usa-media-block__body">
                    <h2 class="usa-graphic-list__heading">Health Is More Than Weight.</h2>
                    <p>
                      The truth is that health goes way beyond that.
                      Many obese people are metabolically healthy, while many normal-weight people have the same metabolic problems associated with obesity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="test-section-id" class="usa-section">
            <div class="grid-container">
              <h2 class="font-heading-xl margin-y-0">Calories Count</h2>
              <p class="usa-intro">But you don't necessarily need to count them.</p>
              <p class="usa-intro">
                Calories are important. Obesity is a matter of excess stored energy, or calories, accumulating in the form of body fat.
                However, this doesn’t mean you need to monitor everything that enters your body and track or count calories.
              </p>

              <p class="usa-intro">
                Though calorie counting works for a lot of people, you can do many things to lose weight — without ever having to count a single calorie.
                For example, eating more protein has been shown to lead to automatic calorie restriction and significant weight loss — without deliberately restricting calories.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fireDb from "@/fireDb";

export default {
  name: "auth",
  mounted() {
    fireDb.authForm("#firebaseui-auth-container");
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  }
};
</script>

<style>
@import "../../node_modules/firebaseui/dist/firebaseui.css";

.usa-hero {
  background-image: url("../assets/food.jpg");
}
.food-icon {
  color: #00bde3;
  font-size: 3em;
}
</style>