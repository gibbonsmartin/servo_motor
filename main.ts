let speed: number
let direction : string

enum Servos {
    SERVO_1,
    SERVO_2
}

function do_servo(servo : Servos, pos : number) {
    switch (servo){
    case Servos.SERVO_1:
        servos.P1.setAngle(pos)
        break;
    case Servos.SERVO_2:
        servos.P2.setAngle(pos)
        break;
    }
}

function on_button_pressed_b() {
    pins.analogWritePin(AnalogPin.P12, 1023*speed/10)
    pins.analogWritePin(AnalogPin.P8, 0)
}

function on_button_pressed_f() {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P8, 1023*speed/10)
}

function on_button_pressed_s() {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P8, 0)
}
function on_button_pressed_u() {
    servos.P1.setAngle(10)
}

function on_button_pressed_d() {
    servos.P1.setAngle(170)
}

function on_button_pressed_l() {
    servos.P2.setAngle(10)
}

function on_button_pressed_r() {
    servos.P2.setAngle(170)
}

function refresh_speed()
{
    if (direction == "s") {
        on_button_pressed_s()
    } else if (direction == "f") {
        on_button_pressed_f()
    } else if (direction == "b") {
        on_button_pressed_b()
    }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function on_uart_data_received() {
    let data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (data == "l") {
        on_button_pressed_l()
    } else if (data == "r") {
        on_button_pressed_r()
    } else if (data == "s") {
        on_button_pressed_s()
        direction = "s"
    } else if (data == "f") {
        on_button_pressed_f()
        direction = "f"
    } else if (data == "b") {
        on_button_pressed_b()
        direction = "b"
    } else if (data == "u") {
        on_button_pressed_u()
    } else if (data == "d") {
        on_button_pressed_d()
    }else{
        speed = parseInt(data)
        refresh_speed()
    }
    basic.showString(data)
})
speed = 5
direction = "s"
input.onButtonPressed(Button.A, on_button_pressed_f)
input.onButtonPressed(Button.B, on_button_pressed_b)
pins.servoSetPulse(AnalogPin.P2, 1500)
pins.servoSetPulse(AnalogPin.P1, 1500)
pins.analogWritePin(AnalogPin.P12, 0)
pins.analogWritePin(AnalogPin.P8, 0)
pins.analogSetPeriod(AnalogPin.P12, 20000)
pins.analogSetPeriod(AnalogPin.P8, 20000)
on_button_pressed_u()
on_button_pressed_r()
on_button_pressed_s()
