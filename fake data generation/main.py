from Users import *
from Portfolios import *
import codecs, json

def main():

	users = []
	portfolios = []
	
	for i in range(500):
		us.append(Users())
		us.append(Portfolios())

	with open("dis.txt","w") as out:
		for i in range(len(us)):
			out.write("\n")
			for num in us[i].distanceto(us):
				out.write(str(num) + " ")

main()

