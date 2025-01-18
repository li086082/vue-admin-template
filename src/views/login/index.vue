<script lang="ts" setup>
    import { ref } from "vue";
    import { ElLoading, ElMessage } from "element-plus";
    import { doLogin, type Login } from "@/apis/login";
    import { useRouter } from "vue-router";
    import { useAppStore } from "@/store/appStore";

    const router = useRouter();

    const account = ref<string>("");
    const password = ref<string>("");
    const btnStatus = ref<boolean>(false);

    function handleClickLogin() {
        btnStatus.value = true;

        const AccountRegex = /^[a-zA-Z][a-zA-Z0-9_-]{5,31}$/;
        const PasswordRegex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{5,31}$/;
        if (!AccountRegex.test(account.value) || !PasswordRegex.test(password.value)) {
            ElMessage({
                type: "error",
                message: "请输入正确的账号或密码!!!!",
                grouping: true,
            });
            btnStatus.value = false;
            return;
        }

        const loading = ElLoading.service({
            fullscreen: true,
            text: "登录中...",
        });

        doLogin(account.value, password.value)
            .then(
                (rs: Login) => {
                    const appStore = useAppStore();
                    appStore.setIsLogin(true);
                    appStore.setNickname(rs.nickname);
                    appStore.setAccessToken(rs.accessToken);
                    appStore.setRefreshToken(rs.refreshToken);
                    appStore.setMenus(rs.menus);

                    ElMessage({
                        type: "success",
                        message: "登录成功",
                    });

                    router.replace({ name: "dashboard" });
                },
                (err) => {
                    console.error(err);
                }
            )
            .finally(() => {
                loading.close();
                btnStatus.value = false;
            });
    }
</script>
<template>
    <div class="container">
        <div class="moon"></div>
        <div class="box">
            <img
                class="pic"
                src="./../../assets/login_bg.png"
            />
            <div class="login">
                <div class="title">登录</div>
                <div class="form_input">
                    <div class="txt">账号</div>
                    <input
                        class="form_input_item"
                        name="account"
                        v-model="account"
                    />
                    <svg
                        class="account_svg"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="10013"
                        width="128"
                        height="128"
                    >
                        <path
                            d="M874.666667 181.333333H149.333333c-40.533333 0-74.666667 34.133333-74.666666 74.666667v512c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V256c0-40.533333-34.133333-74.666667-74.666666-74.666667z m-725.333334 64h725.333334c6.4 0 10.666667 4.266667 10.666666 10.666667v25.6L512 516.266667l-373.333333-234.666667V256c0-6.4 4.266667-10.666667 10.666666-10.666667z m725.333334 533.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V356.266667l356.266666 224c4.266667 4.266667 10.666667 4.266667 17.066667 4.266666s12.8-2.133333 17.066667-4.266666l356.266666-224V768c0 6.4-4.266667 10.666667-10.666666 10.666667z"
                            p-id="10014"
                        ></path>
                    </svg>
                </div>
                <div class="form_input">
                    <div class="txt">密码</div>
                    <input
                        class="form_input_item"
                        name="password"
                        type="password"
                        v-model="password"
                    />
                    <svg
                        class="account_svg"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7561"
                        width="128"
                        height="128"
                    >
                        <path
                            d="M804.571429 1023.975619 219.428571 1023.975619C165.571048 1023.975619 121.904762 1004.714667 121.904762 950.832762L121.904762 536.356571C121.904762 482.499048 165.571048 438.832762 219.428571 438.832762L219.428571 438.832762 219.428571 292.547048 219.428571 292.547048C219.428571 130.974476 350.403048-0.024381 512-0.024381 673.572571-0.024381 804.571429 130.974476 804.571429 292.547048L804.571429 438.832762C858.428952 438.832762 902.095238 482.499048 902.095238 536.356571L902.095238 950.832762C902.095238 1004.714667 858.428952 1023.975619 804.571429 1023.975619ZM755.809524 292.547048 755.809524 292.547048C755.809524 292.547048 755.809524 292.547048 755.809524 292.547048 755.809524 157.891048 646.631619 48.737524 512 48.737524 377.344 48.737524 268.166095 157.891048 268.166095 292.547048 268.166095 292.547048 268.166095 292.547048 268.166095 292.547048L268.190476 292.547048 268.190476 438.832762 755.809524 438.832762 755.809524 292.547048ZM853.333333 536.356571C853.333333 509.44 831.488 487.594667 804.571429 487.594667L219.428571 487.594667C192.487619 487.594667 170.666667 509.44 170.666667 536.356571L170.666667 950.832762C170.666667 977.773714 192.487619 975.213714 219.428571 975.213714L804.571429 975.213714C831.488 975.213714 853.333333 977.773714 853.333333 950.832762L853.333333 536.356571ZM536.380952 801.109333 536.380952 877.714286C536.380952 891.172571 525.458286 902.095238 512 902.095238 498.541714 902.095238 487.619048 891.172571 487.619048 877.714286L487.619048 801.109333C445.635048 790.235429 414.47619 752.420571 414.47619 707.023238 414.47619 653.165714 458.142476 609.499429 512 609.499429 565.857524 609.499429 609.52381 653.165714 609.52381 707.023238 609.52381 752.420571 578.364952 790.235429 536.380952 801.109333ZM512 658.261333C485.059048 658.261333 463.238095 680.106667 463.238095 707.023238 463.238095 733.96419 485.059048 755.809524 512 755.809524 538.916571 755.809524 560.761905 733.96419 560.761905 707.023238 560.761905 680.106667 538.916571 658.261333 512 658.261333Z"
                            p-id="7562"
                        ></path>
                    </svg>
                </div>
                <div class="form_input">
                    <button
                        type="button"
                        class="submit"
                        :disabled="btnStatus"
                        @click="handleClickLogin"
                    >
                        提交
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .container {
        width: 100%;
        height: 100%;
        background-color: rgb(235, 236, 240);
        position: relative;
        box-sizing: border-box;
        overflow-x: hidden;

        .moon {
            width: 500px;
            height: 500px;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;
            left: 0%;
            top: -350px;

            &::after {
                content: "";
                display: block;
                border: 1px solid rgb(194, 205, 216);
                width: 500px;
                height: 500px;
                border-radius: 50%;
                position: absolute;
                left: 30%;
            }
        }
        .box {
            width: 80%;
            height: 60%;
            position: relative;
            left: 10%;
            top: 50%;
            transform: translateY(-50%);
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .pic {
                width: 50%;
                user-select: none;
                display: block;
                pointer-events: none;
            }
            .login {
                width: 36%;
                height: 80%;
                background-color: #fff;
                border-radius: 10px;
                position: relative;
                top: 10%;
                padding: 50px 60px;
                box-sizing: border-box;
                box-shadow:
                    1px 1px 1px 1px rgba(192, 192, 192, 0.3) inset,
                    1px 1px 1px 1px rgba(192, 192, 192, 0.3);
                .title {
                    height: 60px;
                    line-height: 60px;
                    font-size: 32px;
                    margin-bottom: 20px;
                    font-weight: 900;
                }
                .form_input {
                    width: 100%;
                    height: 80px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    box-sizing: border-box;
                    margin: 20px 0;
                    position: relative;
                    .txt {
                        font-size: 16px;
                    }
                    .form_input_item {
                        border: 1px solid rgb(194, 205, 216);
                        outline: none;
                        height: 40px;
                        border-radius: 6px;
                        padding: 0 10px 0 40px;
                        font-size: 20px;
                        &:focus {
                            border: 1px solid rgb(87, 59, 255);
                        }
                        &:focus ~ .account_svg {
                            fill: rgb(87, 59, 255);
                        }
                    }
                    .account_svg {
                        width: 25px;
                        height: 25px;
                        fill: #707070;
                        position: absolute;
                        left: 10px;
                        bottom: 8px;
                    }
                    .submit {
                        outline: none;
                        border: none;
                        background-color: #000;
                        color: #fff;
                        border-radius: 10px;
                        margin: 20px 0;
                        padding: 10px 0;
                        font-weight: 900;
                        font-size: 20px;
                        user-select: none;
                    }
                }
            }
        }

        // 为适配做一些处理
        @media (960px < width < 1280px) {
            .box {
                .login {
                    width: 46%;
                }
            }
        }
        @media (680px < width <= 960px) {
            .box {
                .login {
                    width: 50%;
                }
            }
        }
        @media (width <= 680px) {
            .moon {
                width: 300px;
                height: 300px;
                top: -200px;

                &::after {
                    width: 300px;
                    height: 300px;
                    position: relative;
                    left: 25%;
                }
            }
            .box {
                width: 90%;
                height: 60%;
                position: relative;
                left: 5%;
                .pic {
                    display: none;
                }
                .login {
                    width: 100%;
                    height: 80%;
                    position: relative;
                    top: 10%;
                    padding: 20px 15px;
                }
            }
        }
    }
</style>
