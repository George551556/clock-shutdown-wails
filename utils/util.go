package utils

import (
	"fmt"
	"os/exec"
	"syscall"
	"time"
)

func PowerOff(min int) error {
	if min < 0 {
		cmd := exec.Command("shutdown", "-a")

		// 关键：设置不弹出黑框
		cmd.SysProcAttr = &syscall.SysProcAttr{
			HideWindow: true,
		}

		ret, err := cmd.CombinedOutput()
		if err != nil {
			if err.Error() == "exit status 1116" {
				return fmt.Errorf("已经取消")
			} else {
				return err
			}
		}
		fmt.Println(ret)
		return nil
	}
	sec := 60 * min
	cmd := exec.Command("shutdown", "-s", "-t", fmt.Sprintf("%d", sec))

	// 关键：设置不弹出黑框
	cmd.SysProcAttr = &syscall.SysProcAttr{
		HideWindow: true,
	}

	ret, err := cmd.CombinedOutput()
	if err != nil {
		if err.Error() == "exit status 1190" {
			fmt.Println("检测到已设置定时")
			//检测到已设置定时,先取消定时，再重新定时
			err = PowerOff(-1)
			time.Sleep(500 * time.Millisecond)
			if err != nil {
				return fmt.Errorf("重新定时失败: %s", err.Error())
			}
			return PowerOff(min)
		} else {
			return err
		}
	}
	fmt.Println(ret)
	return nil
}
