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

function do_motor(velocity : number)
{
    if (velocity >= 0){
        pins.analogWritePin(AnalogPin.P12, velocity)
        pins.analogWritePin(AnalogPin.P8, 0)
    }
    else {
        pins.analogWritePin(AnalogPin.P8, Math.abs(velocity))
        pins.analogWritePin(AnalogPin.P12, 0)
    }
}

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function on_uart_data_received() {
    let data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))

    basic.showString(data)
    switch (data.substr(0,1)){
        case "S":
            switch (data.substr(1,1)){
                case "0":
                    do_servo(Servos.SERVO_1, parseInt(data.substr(2)) )
                break;
                case "1":
                    do_servo(Servos.SERVO_1, parseInt(data.substr(2)) )
                break;
                default:
                break;
            }
        break;
        case "M":
            do_motor(parseInt(data.substr(1)))
        break;
        default:
        break;
    }
})
