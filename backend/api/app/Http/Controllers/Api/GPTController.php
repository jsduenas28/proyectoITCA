<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;
use App\Models\Nota;

class GPTController extends Controller
{
    function genCuestionario ($id) {

        $nota = Nota::where('id', $id)->get();

        $texto = $nota[0]['contenido_nota'];

        $result = OpenAI::completions()->create([
            'model' => 'text-davinci-003',
            'temperature' => 1,
            'top_p' => 1,
            'max_tokens' => 2000,
            'prompt' => '
                Genera una pregunta usando un texto como contexto para la pregunta, genera tambien las opciones
                para responder la pregunta, usa el siguiente formato:

                {
                    "pregunta": "string",
                    "respuestas": "array" ["string"]
                    "resCorrecta": "string"
                }

                agrega la información que generes dentro del formato JSON y retornalo, NO RETORNES NADA
                QUE NO VAYA A ESTAR DENTRO DEL OBJETO JSON POR FAVOR, no quiero ningun otro tipo de texto
                fuera del objeto JSON, agrega las respuestas en "respuestas"
                y separa la respuesta correcta en "resCorrecta", NO PUEDEN HABER COMAS EN "resCorrecta".

                Texto:
            '.$texto
        ]);

        return $result['choices'][0]['text'];
    }
}
