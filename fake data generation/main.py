from Users import *

def main():
	us = []
	for i in range(6):
		us.append(Users())

	with open("dis.txt","w") as out:
		for i in range(len(us)):
			out.write("\n")
			for num in us[i].distanceto(us):
				out.write(str(num) + " ")

main()
